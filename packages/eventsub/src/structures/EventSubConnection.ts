import { HelixClient } from '@twitchapi/helix';
import { Client } from './Client';
import { EventSubEventEmitter } from './EventSubEventEmitter';
import { EventSubWebsocket } from './EventSubWebsocket';
import { Subscription } from './Subscription';
import { SubscriptionCollection } from './SubscriptionCollection';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { Events } from '../enums/Events';
import { SubscriptionOptions } from '../interfaces/SubscriptionOptions';
import { EventSubConnectionOptions } from '../interfaces/EventSubConnectionOptions';
import { SubscriptionVersions } from '../util/SubscriptionVersions';


export class EventSubConnection extends EventSubEventEmitter{

  public client: Client;

  public auth: string;

  public clientID: string;

  public proxy?: string;

  public helixClient: HelixClient;

  public subscriptions: SubscriptionCollection;

  public ws: EventSubWebsocket;

  public sessionID: string | null;

  public constructor(client: Client, options: EventSubConnectionOptions){

    super();

    this.client = client;

    this.auth = options.auth;

    this.clientID = options.clientID;

    this.proxy = options.proxy;

    this.helixClient = new HelixClient({ clientId: options.clientID, userToken: options.auth, ...options.helix });

    this.subscriptions = new SubscriptionCollection();

    this.ws = new EventSubWebsocket(this);

    this.sessionID = null;

  }


  public connect() {

    this.ws.connect();

  }

  public async subscribe<T extends SubscriptionTypes>(subscriptionType: T, options: SubscriptionOptions[T], auth?: string){
 
    const data = await this.helixClient.subscribeToEventSub({ type: subscriptionType, version: SubscriptionVersions[subscriptionType], transport: { method: 'websocket', session_id: this.sessionID }, condition: options }, auth);

    const subscription = new Subscription<T>(this, auth ?? this.auth, subscriptionType, data);

    this.subscriptions.set(subscription.id, subscription);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;

  }

  public setAuth(auth: string){
    
    this.auth = auth;

    return this;
  }

}