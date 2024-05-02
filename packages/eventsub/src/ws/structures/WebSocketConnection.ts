import type { TokenAdapter } from '@twitchfy/helix';
import { WebSocket } from './WebSocket';
import { BaseConnection } from '../../structures/BaseConnection';
import { Events, type SubscriptionTypes } from '../../enums';
import type { WebSocketConnectionOptions } from '../types';
import { SubscriptionVersionsObject } from '../../util';
import type { SubscriptionOptions } from '../../types';
import type { WebSocketEvents } from '../../interfaces';
import { WebSocketSubscription } from './WebSocketSubscription';


export class WebSocketConnection extends BaseConnection<WebSocketConnection, WebSocketEvents>{

  public readonly proxy?: string;

  public ws: WebSocket;

  public sessionId: string | null;

  public constructor(options: WebSocketConnectionOptions){

    super(options);

    this.proxy = options.proxy;

    this.helixClient.setUserToken(options.userToken);

    this.helixClient.preferedToken = 'user';

    this.ws = new WebSocket(this);

    this.sessionId = null;

  }


  public async connect() {

    await this.ws.connect();

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>){

    const { type, options: subscriptionOptions } = options;

    const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionId }, condition: subscriptionOptions }, { useTokenType: 'user' });

    const subscription = new WebSocketSubscription<T>(this, options, data);

    this.subscriptions.set(subscription.id, subscription);

    await this.storage?.set(subscription.id, subscription);

    this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptions<T>[]){

    const subscriptions: WebSocketSubscription<T>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions } = sub;
 
      const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionId }, condition: subscriptionOptions });

      const subscription = new WebSocketSubscription<T>(this, sub, data);

      await this.storage?.set(subscription.id, subscription);

      this.subscriptions.set(subscription.id, subscription);

      this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions;

  }
  

  public setAuth(userToken: TokenAdapter<'code' | 'implicit', boolean>){
    
    this.helixClient.setUserToken(userToken);

    return this;
  }

  public get userToken() {
    return this.helixClient.userToken;
  }

}