/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Express } from 'express';
import type { PostEventSubSubscription } from '@twitchfy/api-types';
import type { TokenAdapter } from '@twitchfy/helix';
import { WebhookSubscription } from './WebhookSubscription';
import type { WebhookConnectionOptions } from '../types';
import { makeMiddlewares, parseRoute } from '../util';
import { SubscriptionRouter } from '../routes';
import { BaseConnection } from '../../structures/BaseConnection';
import { Events, type SubscriptionTypes } from '../../enums';
import { SubscriptionVersionsObject } from '../../util';
import type { StorageAdapterGet, SubscriptionOptions } from '../../types';
import type { WebhookEvents } from '../../interfaces';

/**
 * A Webhook Connection.
 */
export class WebhookConnection extends BaseConnection<WebhookConnection, WebhookEvents> {

  /**
   * The express server used for receiving Twitch data.
   */
  public readonly server: Express;

  /**
   * The base URL for the webhook callback.
   */
  public readonly baseURL: string;

  /**
   * The secret used for creating subscriptions within this connection.
   */
  public readonly secret: string;

  /**
   * Whether to start the server when the connection is started.
   */
  public readonly startServer: boolean;

  /**
   * The route for receiving Twitch messages.
   * @default /subscriptions
   */
  public readonly subscriptionRoute: string;

  /**
   * Whether to drop subscriptions at start. This will delete all subscriptions that are currently active within the client (only webhook created) to avoid duplicated subscriptions if any storage was set.
   */
  public readonly dropSubsAtStart: boolean;


  /**
   * Builds up a new WebhookConnection.
   * @param options The options for the connection.
   * @param server The express server used for receiving Twitch data.
   */
  public constructor(options: WebhookConnectionOptions, server: Express){

    super(options);

    this.baseURL = options.baseURL;

    this.secret = options.secret;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : false;

    this.server = server;

    this.dropSubsAtStart = typeof options.dropSubsAtStart === 'boolean'? options.dropSubsAtStart : false;

  }


  /**
   * The URL for the webhook callback. This is a join between the base url and the subscription route.
   */
  public get url(){
    return `${this.baseURL}${this.subscriptionRoute}`;
  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>){

    const { type, options: subscriptionOptions } = options;
 
    const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: this.url, secret: this.secret }, condition: subscriptionOptions }, { useTokenType: 'app' });

    const subscription = new WebhookSubscription<T>(this, options, data, this.secret);

    await this.storage?.set(subscription.id, subscription);

    this.subscriptions.set(subscription.id, subscription);

    this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptions<T>[]){

    const subscriptions: WebhookSubscription<T>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions } = sub;
 
      const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: this.url, secret: this.secret }, condition: subscriptionOptions }, { useTokenType: 'app' });

      const subscription = new WebhookSubscription<T>(this, sub, data, this.secret);

      await this.storage?.set(subscription.id, subscription);

      this.subscriptions.set(subscription.id, subscription);

      this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions;

  }

  /**
   * Starts the Webhook Connection.
   * @param port The port to start the server at if the startServer option is set to true.
   * @param callback A callback to be called when the server is started if the startServer option is set to true.
   */
  public async start(port?: number, callback?: () => void){

    if(this.startServer) this.server.listen(port, callback);

    await this.startup();

    return this.emit(Events.ConnectionReady, this);

  }

  /**
   * Sets a new app token for the connection.
   * @param appToken The new app token.
   * @returns The connection.
   */
  public setAuth(appToken: TokenAdapter<'app', boolean>){

    this.helixClient.setAppToken(appToken);

    return this;
  }

  /**
   * The app token used for the connection.
   */
  public get appToken(){
    return this.helixClient.appToken;
  }

  /**
   * Startup the connection. Reloading subscriptions if an storage was set.
   * @returns 
   * @private
   */
  private async startup() {

    if(this.dropSubsAtStart) await processChunks(this, chunkArray((await this.helixClient.getEventSubSubscriptions()).filter((x) => x.transport.method === 'webhook'), 30));

    if(this.maintainSubscriptions){

      const apiSubs = await this.helixClient.getEventSubSubscriptions({ status: 'enabled' });

      const filteredSubs = apiSubs.filter((x) => x.transport.callback === this.url);

      this.makeDebug(`Fetched a total of ${apiSubs.length} API Subscriptions. Filtered to ${filteredSubs.length} for this callback ${this.baseURL}${this.subscriptionRoute}.`);

      const storage = (await this.storage.getAll()).reduce((acc: StorageAdapterGet<WebhookConnection>[], x: StorageAdapterGet<WebhookConnection>) => {
        const equal = acc.find((i) => i.type === x.type && JSON.stringify(i.options) === JSON.stringify(x.options));
        if(!equal) acc.push(x);
        return acc;
      }, []);

      for await(const data of storage){

        if(!data.secret){
          
          await this.storage.delete(data.id);

          this.makeDebug(`Subscription (${data.type}) ${data.id} doesn't have a secret, skipping and deleting.`);
  
          continue;
        }

        if(data.secret !== this.secret){
            
          await this.storage.delete(data.id);
  
          this.makeDebug(`Subscription (${data.type}) ${data.id} has a different secret, skipping and deleting.`);
  
          continue;
        }
        
        const filteredSub = filteredSubs.find((x) => x.id === data.id || (x.type === data.type && JSON.stringify(x.condition) === JSON.stringify(data.options) && x.transport.callback === this.url));

        if(!filteredSub){

          const subscriptionData = await this.helixClient.subscribeToEventSub({ type: data.type, condition: data.options, transport: { method: 'webhook', secret: data.secret, callback: this.url }, version: SubscriptionVersionsObject[data.type] });

          const subscription = new WebhookSubscription<typeof data.type>(this, data, subscriptionData, data.secret);

          await this.storage.delete(data.id);

          await this.storage.set(subscription.id, subscription);

          this.subscriptions.set(subscription.id, subscription);

          this.makeDebug(`Created subscription as it couldn't be reloaded (${subscription.type}) (not exist or it status was revoked) ${subscription.id}`);

          this.emit(Events.SubscriptionReload, subscription);

        } else {

          const subscription = new WebhookSubscription<typeof data.type>(this, data, filteredSub, data.secret);

          if(data.id !== filteredSub.id){

            await this.storage.delete(data.id);

            await this.storage.set(filteredSub.id, subscription);

          }

          this.subscriptions.set(filteredSub.id, subscription);

          this.makeDebug(`Reloaded subscription ${subscription.type} ${subscription.id}`);

          this.emit(Events.SubscriptionReload, subscription);

        }

      }

    }
    
    makeMiddlewares(this, this.server);

    this.server.use(this.subscriptionRoute, SubscriptionRouter);

    this.makeDebug('Default middlewares have been set into the express server.');

    return;

  }
}

function chunkArray(array: PostEventSubSubscription[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}


async function processChunks(connection: WebhookConnection, chunks: PostEventSubSubscription[][]) {

  let index = 0;

  while (index < chunks.length) {
    
    const chunk = chunks[index];

    for(const subscription of chunk){

      if(subscription.transport.method !== 'webhook') continue;

      connection.helixClient.deleteEventSubSubscription(subscription.id);

      connection.makeDebug(`Drop subscription (${subscription.id}) at start because dropSubsAtStart was enabled.`);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
