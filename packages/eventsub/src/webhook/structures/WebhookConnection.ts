/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Express } from 'express';
import type { PostEventSubSubscription } from '@twitchapi/api-types';
import type { TokenAdapter } from '@twitchapi/helix';
import { WebhookSubscription } from './WebhookSubscription';
import type { WebhookConnectionOptions } from '../types';
import { makeMiddlewares, parseRoute } from '../util';
import { SubscriptionRouter } from '../routes';
import { BaseConnection } from '../../structures/BaseConnection';
import { Events, type SubscriptionTypes } from '../../enums';
import { SubscriptionVersionsObject } from '../../util';
import type { SubscriptionOptions } from '../../types';
import type { WebhookEvents } from '../../interfaces';

export class WebhookConnection extends BaseConnection<WebhookConnection, WebhookEvents> {

  public readonly server: Express;

  public readonly baseURL: string;

  protected appToken: TokenAdapter<'app', boolean>;

  public readonly secret: string;

  public readonly startServer: boolean;

  public readonly subscriptionRoute: string;

  public readonly dropSubsAtStart: boolean;
  

  public constructor(options: WebhookConnectionOptions, server: Express){

    super(options);

    this.baseURL = options.baseURL;

    this.appToken = options.appToken;

    this.helixClient.setAppToken(options.appToken);

    const onAppTokenRefresh = this.helixClient.callbacks.onAppTokenRefresh;
    
    this.helixClient.callbacks.onAppTokenRefresh = (oldToken, newToken) => {

      this.appToken = newToken;

      if(onAppTokenRefresh) onAppTokenRefresh(oldToken, newToken);
    };

    this.secret = options.secret;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : false;

    this.server = server;

    this.dropSubsAtStart = typeof options.dropSubsAtStart === 'boolean'? options.dropSubsAtStart : this.maintainSubscriptions? false : true;

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>){

    const { type, options: subscriptionOptions } = options;
 
    const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret: this.secret }, condition: subscriptionOptions }, { useTokenType: 'app' });

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
 
      const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret: this.secret }, condition: subscriptionOptions }, { useTokenType: 'app' });

      const subscription = new WebhookSubscription<T>(this, sub, data, this.secret);

      await this.storage?.set(subscription.id, subscription);

      this.subscriptions.set(subscription.id, subscription);

      this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions;

  }

  public async start(port?: number, callback?: () => void){

    if(this.startServer) this.server.listen(port, callback);

    await this.startup();

    return this.emit(Events.ConnectionReady, this);

  }

  public setAuth(appToken: TokenAdapter<'app', boolean>){

    this.appToken = appToken;

    return this;

  }

  private async startup() {

    if(this.dropSubsAtStart) await processChunks(this, chunkArray(await this.helixClient.getSubscriptions(), 30));

    if(this.maintainSubscriptions){

      const apiSubs = await this.helixClient.getSubscriptions({ status: 'enabled' });

      const filteredSubs = apiSubs.filter((x) => x.transport.callback === `${this.baseURL}${this.subscriptionRoute}`);

      this.makeDebug(`Fetched a total of ${apiSubs.length} API Subscriptions. Filtered to ${filteredSubs.length} for this callback ${this.baseURL}${this.subscriptionRoute}.`);

      for await(const data of await this.storage.getAll()){

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
        
        const filteredSub = filteredSubs.find((x) => x.id === data.id || (x.type === data.type && JSON.stringify(x.condition) === JSON.stringify(data.options) && x.transport.callback === `${this.baseURL}${this.subscriptionRoute}`));

        if(!filteredSub){

          const subscriptionData = await this.helixClient.subscribeToEventSub({ type: data.type, condition: data.options, transport: { method: 'webhook', secret: data.secret, callback: `${this.baseURL}${this.subscriptionRoute}` }, version: SubscriptionVersionsObject[data.type] });

          const subscription = new WebhookSubscription<typeof data.type>(this, data, subscriptionData, data.secret);

          await this.storage.delete(data.id);

          await this.storage.set(subscription.id, subscription);

          this.subscriptions.set(subscription.id, subscription);

          this.makeDebug(`Created subscription as it couldn't be reloaded (${subscription.type}) (not exist or it's status was revoked) ${subscription.id}`);

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

      connection.helixClient.deleteSubscription(subscription.id);

      connection.makeDebug(`Drop subscription (${subscription.id}) at start because dropSubsAtStart was enabled.`);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
