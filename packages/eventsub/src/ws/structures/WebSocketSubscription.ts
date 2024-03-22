import type { UserTokenAdapter } from '@twitchapi/helix';
import type { PostEventSubSubscription } from '@twitchapi/api-types';
import type { WebSocketConnection } from './WebSocketConnection';
import { WebSocketSubscriptionCallbackManager } from './WebSocketSubscriptionCallbackManager';
import type { WebSocketSubscriptionCallback } from '../types';
import { Events } from '../../enums';
import type { SubscriptionTypes } from '../../enums';
import { Subscription } from '../../structures/Subscription';
import type { SubscriptionOptions } from '../../types';


export class WebSocketSubscription<T extends SubscriptionTypes = SubscriptionTypes> extends Subscription<T>{
 
  public readonly connection: WebSocketConnection;

  public readonly userToken: UserTokenAdapter<boolean>;

  public callbacks: WebSocketSubscriptionCallbackManager<T>;

  public constructor(connection: WebSocketConnection, options: SubscriptionOptions<T>, data: PostEventSubSubscription){

    super(options, data);

    this.connection = connection;

    this.userToken = connection.userToken;

    this.callbacks = new WebSocketSubscriptionCallbackManager<T>(connection);

    this.callbacks.add((message) => this.connection.emit(Events.SubscriptionMessage, message, this));

    if(this.connection.debug) this.callbacks.add((message) => this.connection.makeDebug(`Received a message (${this.type}) from subscription ${message.subscription.id}}`));

  }

  public onMessage(callback: WebSocketSubscriptionCallback<T>) {

    this.callbacks.add(callback);

  }

  public checkSubscriptionType<U extends T>(type: U): this is WebSocketSubscription<U> {
    return this.type === type;
  }

  public async delete() {

    await this.connection.helixClient.deleteSubscription(this.id, { useTokenType: 'user' });

    this.connection.subscriptions.delete(this.id);

    await this.connection.storage?.delete(this.id);

    this.connection.makeDebug(`Deleted subscription (${this.id})`);    

    return;

  }


}