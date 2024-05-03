import type { TokenAdapter } from '@twitchfy/helix';
import { WebSocket } from './WebSocket';
import { BaseConnection } from '../../structures/BaseConnection';
import { Events, type SubscriptionTypes } from '../../enums';
import type { WebSocketConnectionOptions } from '../types';
import { SubscriptionVersionsObject } from '../../util';
import type { SubscriptionOptions } from '../../types';
import type { WebSocketEvents } from '../../interfaces';
import { WebSocketSubscription } from './WebSocketSubscription';

/**
 * The WebSocket connection used for EventSub.
 */
export class WebSocketConnection extends BaseConnection<WebSocketConnection, WebSocketEvents>{

  /**
   * The proxy url used for the connection.
   */
  public readonly proxy?: string;

  /**
   * The WebSocket client used for the connection.
   */
  public ws: WebSocket;

  /**
   * The session id of the connection.
   */
  public sessionId: string | null;

  /**
   * Builds up a new WebSocketConnection.
   * @param options The options for the connection.
   */
  public constructor(options: WebSocketConnectionOptions){

    super(options);

    this.proxy = options.proxy;

    this.helixClient.setUserToken(options.userToken);

    this.helixClient.preferedToken = 'user';

    this.ws = new WebSocket(this);

    this.sessionId = null;

  }

  /**
   * Connects to the WebSocket server.
   */
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
  
  /**
   * Sets the user token for the connection.
   * @param userToken The new user token to set.
   * @returns The connection.
   */
  public setAuth(userToken: TokenAdapter<'code' | 'implicit', boolean>){
    
    this.helixClient.setUserToken(userToken);

    return this;
  }

  /**
   * Gets the user token that is being used for the connection.
   */
  public get userToken() {
    return this.helixClient.userToken;
  }

}