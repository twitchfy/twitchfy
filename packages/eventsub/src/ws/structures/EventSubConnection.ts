import { HelixClient } from '@twitchapi/helix';
import { EventEmitter } from 'node:events';
import { EventSubWebsocket } from './EventSubWebsocket';
import { Subscription, SubscriptionCollection, type Client } from '../../structures';
import { Events, type SubscriptionTypes } from '../../enums';
import type { EventSubConnectionOptions } from '../interfaces';
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
export class EventSubConnection extends EventSubEventEmitter<EventSubConnection>{

  public client: Client;

  public auth: string;

  public clientID: string;

  public proxy?: string;

  public helixClient: HelixClient;

  public subscriptions: SubscriptionCollection<EventSubConnection>;

  public ws: EventSubWebsocket;

  public sessionID: string | null;

  public constructor(client: Client, options: EventSubConnectionOptions){

    super();

    this.client = client;

    this.auth = options.auth;

    this.clientID = options.clientID;

    this.proxy = options.proxy;

    this.helixClient = new HelixClient({ clientId: options.clientID, userToken: options.auth, ...options.helix });

    this.subscriptions = new SubscriptionCollection<EventSubConnection>();

    this.ws = new EventSubWebsocket(this);

    this.sessionID = null;

  }


  public connect() {

    this.ws.connect();

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<Subscription<T, EventSubConnection>>{

    const { type, options: subscriptionOptions, auth } = options;
 
    const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionID }, condition: subscriptionOptions }, auth);

    const subscription = new Subscription<T, EventSubConnection>(this, options, data);

    this.subscriptions.set(subscription.id, subscription);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptionsIndex[T][]): Promise<Subscription<T, EventSubConnection>[]>{

    const subscriptions: Subscription<SubscriptionTypes, EventSubConnection>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions, auth } = sub;
 
      const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionID }, condition: subscriptionOptions }, auth);

      const subscription = new Subscription<SubscriptionTypes, EventSubConnection>(this, sub, data);

      this.subscriptions.set(subscription.id, subscription);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions as Subscription<T, EventSubConnection>[];

  }

  public setAuth(auth: string){
    
    this.auth = auth;

    return this;
  }

}