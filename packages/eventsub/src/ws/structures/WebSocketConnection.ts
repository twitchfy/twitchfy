import type { TokenAdapter, UserTokenAdapter } from '@twitchapi/helix';
import { WebSocket } from './WebSocket';
import { BaseConnection } from '../../structures/BaseConnection';
import { Events, type SubscriptionTypes } from '../../enums';
import type { WebSocketConnectionOptions } from '../types';
import { SubscriptionVersionsObject } from '../../util';
import type { SubscriptionOptions } from '../../types';
import type { WebSocketEvents } from '../../interfaces';
import { WebSocketSubscription } from './WebSocketSubscription';


export class WebSocketConnection extends BaseConnection<WebSocketConnection, WebSocketEvents>{

  protected userToken: UserTokenAdapter<boolean>;

  public readonly proxy?: string;

  public readonly ws: WebSocket;

  public sessionID: string | null;

  public constructor(options: WebSocketConnectionOptions){

    super(options);

    this.userToken = options.userToken;

    this.proxy = options.proxy;

    this.helixClient.setUserToken(options.userToken);

    this.helixClient.preferedToken = 'user';

    const onUserTokenRefresh = this.helixClient.callbacks.onUserTokenRefresh;

    this.helixClient.callbacks.onUserTokenRefresh = (oldToken, newToken) => {

      this.userToken = newToken;

      if(onUserTokenRefresh) onUserTokenRefresh(oldToken, newToken);
    };

    this.ws = new WebSocket(this);

    this.sessionID = null;

  }


  public connect() {

    this.ws.connect();

  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>){

    const { type, options: subscriptionOptions } = options;

    const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionID }, condition: subscriptionOptions }, { useTokenType: 'user' });

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
 
      const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersionsObject[type], transport: { method: 'websocket', session_id: this.sessionID }, condition: subscriptionOptions });

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
    
    this.userToken = userToken;

    return this;
  }

}