/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Express } from 'express';
import { HelixClient } from '@twitchapi/helix';
import { EventEmitter } from 'node:events';
import type { PostEventSubscriptions } from '@twitchapi/api-types';
import type { ManagementCallbacks, WebhookConnectionOptions } from '../interfaces';
import { makeMiddlewares, generateSecret, parseRoute, createCallback, deleteCallback, getCallback, done } from '../util';
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

  public startServer: boolean;

  public mantainSubscriptions: boolean;

  public callbacks: ManagementCallbacks;

  public readonly subscriptionRoute: string;
  

  public constructor(client: Client, options: WebhookConnectionOptions, server: Express){

    super();

    this.client = client;

    this.baseURL = options.baseURL;

    this.auth = options.auth;

    this.clientID = options.clientID;

    this.helixClient = new HelixClient({ clientId: options.clientID, appToken: options.auth, ...options.helix });

    this.subscriptions = new SubscriptionCollection<WebhookConnection>();

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : true;

    this.mantainSubscriptions = typeof options.mantainSubscriptions === 'boolean' ? options.mantainSubscriptions : true;

    this.callbacks = options.callbacks || { create: createCallback, delete: deleteCallback, get: getCallback };

    this.server = server;

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<Subscription<T, WebhookConnection>>{

    const { type, options: subscriptionOptions, auth } = options;

    const secret = generateSecret();
 
    const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret }, condition: subscriptionOptions }, auth, { useTokenType: 'app' });

    const subscription = new Subscription<T, WebhookConnection>(this, options, data, secret);

    if(this.mantainSubscriptions) await this.callbacks.create(subscription);

    this.subscriptions.set(subscription.id, subscription);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptionsIndex[T][]): Promise<Subscription<T, WebhookConnection>[]>{

    const subscriptions: Subscription<SubscriptionTypes, WebhookConnection>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions, auth } = sub;

      const secret = generateSecret();
 
      const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret }, condition: subscriptionOptions }, auth , { useTokenType: 'app' });

      const subscription = new Subscription<SubscriptionTypes, WebhookConnection>(this, sub, data, secret);

      if(this.mantainSubscriptions) await this.callbacks.create(subscription);

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

    const subscriptions = await this.helixClient.getSubscriptions({ status: 'enabled' });

    if(this.mantainSubscriptions) {

      for(const data of subscriptions){

        if((data.transport as { callback: string }).callback !== this.baseURL + this.subscriptionRoute){
          
          this.callbacks.delete(data.id);

          continue;
        }

        const savedSubscription = await this.callbacks.get(data.id, done);

        if(!savedSubscription) continue;
      
        const subscription = new Subscription<SubscriptionTypes, WebhookConnection>(this, { type: data.type as SubscriptionTypes, auth: this.auth, options: data.condition as any, nonce: savedSubscription.nonce }, data, savedSubscription.secret);

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

      connection.callbacks.delete(subscription.id);

      connection.helixClient.deleteSubscription(subscription.id);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}