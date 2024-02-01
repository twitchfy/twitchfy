/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Express } from 'express';
import { HelixClient } from '@twitchapi/helix';
import { EventEmitter } from 'node:events';
import type { PostEventSubscriptions } from '@twitchapi/api-types';
import type { WebhookConnectionOptions } from '../interfaces';
import { makeMiddlewares, parseRoute } from '../util';
import { SubscriptionRouter } from '../routes';
import { SubscriptionCollection, Subscription, type Client } from '../../structures';
import { Events, type SubscriptionTypes } from '../../enums';
import type { SubscriptionOptions, SubscriptionOptionsIndex, EventSubEvents } from '../../interfaces';
import { SubscriptionVersionsObject } from '../../util';
import type { ConnectionTypes } from '../../types';

class EventSubEventEmitter<T extends ConnectionTypes = ConnectionTypes> extends EventEmitter {
  public constructor() {
    super();
  }

  override on<K extends keyof EventSubEvents<T>>(event: K, listener: EventSubEvents<T>[K]): this {

    return super.on(event, listener);

  }

  override emit<K extends keyof EventSubEvents<T>>(event: K, ...args: Parameters<EventSubEvents[K]>): boolean {

    return super.emit(event, ...args);

  }
}

export class WebhookConnection extends EventSubEventEmitter<WebhookConnection>{

  public client: Client;

  public server: Express;

  public baseURL: string;

  public auth: string;

  public clientID: string;

  public helixClient: HelixClient;

  public subscriptions: SubscriptionCollection<WebhookConnection>;

  public secret: string;

  public startServer: boolean;

  public mantainSubscriptions: boolean;

  public readonly subscriptionRoute: string;
  

  public constructor(client: Client, options: WebhookConnectionOptions, server: Express){

    super();

    this.client = client;

    this.baseURL = options.baseURL;

    this.auth = options.auth;

    this.clientID = options.clientID;

    this.helixClient = new HelixClient({ clientId: options.clientID, appToken: options.auth, ...options.helix });

    this.subscriptions = new SubscriptionCollection<WebhookConnection>();

    this.secret = options.secret;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : true;

    this.mantainSubscriptions = typeof options.mantainSubscriptions === 'boolean' ? options.mantainSubscriptions : true;

    this.server = server;

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<Subscription<T, WebhookConnection>>{

    const { type, options: subscriptionOptions, auth } = options;
 
    const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret: this.secret }, condition: subscriptionOptions }, auth, { useTokenType: 'app' });

    const subscription = new Subscription<T, WebhookConnection>(this, options, data, this.secret);

    this.subscriptions.set(subscription.id, subscription);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptionsIndex[T][]): Promise<Subscription<T, WebhookConnection>[]>{

    const subscriptions: Subscription<SubscriptionTypes, WebhookConnection>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions, auth } = sub;
 
      const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret: this.secret }, condition: subscriptionOptions }, auth , { useTokenType: 'app' });

      const subscription = new Subscription<SubscriptionTypes, WebhookConnection>(this, sub, data, this.secret);

      this.subscriptions.set(subscription.id, subscription);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions as Subscription<T, WebhookConnection>[];

  }

  public async start(port?: number, callback?: () => void){

    if(this.startServer) this.server.listen(port, callback);

    await this.startup();

  }

  private async startup() {

    const subscriptions = (await this.helixClient.getSubscriptions({ status: 'enabled' })).filter((subscription) => {

      const transport = subscription.transport as { callback: string, method: string };

      return transport.callback === this.baseURL + this.subscriptionRoute && transport.method === 'webhook';

    });

    if(this.mantainSubscriptions) {

      for(const data of subscriptions){

        if((data.transport as { callback: string }).callback !== this.baseURL + this.subscriptionRoute) continue;

        const subscription = new Subscription<SubscriptionTypes, WebhookConnection>(this, { type: data.type as SubscriptionTypes, auth: this.auth, options: data.condition as any }, data, this.secret );

        this.subscriptions.set(subscription.id, subscription);

        this.emit(Events.SubscriptionCreate, subscription);

      }

    }else{

      await processChunks(this, chunkArray(subscriptions, 30));

    }

    makeMiddlewares(this, this.server);

    this.server.use(this.subscriptionRoute, SubscriptionRouter);

    this.emit(Events.ConnectionReady, this);

  }

  public async dropAllSubscriptions(filter: boolean = true){

    if(filter){

      for(const subscription of this.subscriptions.values()){

        this.subscriptions.delete(subscription.id);

        await subscription.delete();


      }

    }else{

      const subscriptions = (await this.helixClient.getSubscriptions({ status: 'enabled' })).filter((subscription) => {

        const transport = subscription.transport as { callback: string, method: string };

        return transport.method === 'webhook';

      });

      await processChunks(this, chunkArray(subscriptions, 30));
    }

    return;

  }
}

function chunkArray(array: PostEventSubscriptions[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

async function processChunks(connection: WebhookConnection, chunks: PostEventSubscriptions[][]) {

  let index = 0;

  while (index < chunks.length) {
    
    const chunk = chunks[index];

    for(const subscription of chunk){

      if(connection.subscriptions.get(subscription.id)) connection.subscriptions.delete(subscription.id);

      connection.helixClient.deleteSubscription(subscription.id);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}