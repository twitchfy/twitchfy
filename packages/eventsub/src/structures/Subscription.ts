import { PostEventSubscriptions } from '@twitchapi/api-types';
import { SubscriptionCallbackManager } from './SubscriptionCallbackManager';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { SubscriptionTypeOptions } from '../interfaces/SubscriptionTypeOptions';
import { SubscriptionOptions } from '../interfaces/SubscriptionOptions';
import { SubscriptionCallback } from '../types/SubscriptionCallback';
import { ConnectionTypes } from '../types/ConnectionTypes';
import { WebhookConnection } from '../webhook/structures/WebhookConnection';

export class Subscription<T extends SubscriptionTypes = SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: K;

  public auth: string;

  public id: string;

  public nonce: string | null ;

  public type: T;

  public status: string;

  public version: string;

  public options: SubscriptionTypeOptions[T];

  public createdAt: Date;

  public readonly secret: K extends WebhookConnection ? string: never;

  public readonly callbacks: SubscriptionCallbackManager<T, K>;


  public constructor(connection: K, options: SubscriptionOptions<T> , data: PostEventSubscriptions, secret?: K extends WebhookConnection ? string : never){

    this.connection = connection;
    this.auth = options.auth ?? connection?.auth;
    this.type = options.type;
    this.id = data.id;
    this.nonce = options.nonce;
    this.status = data.status;
    this.version = data.version;
    this.options = data.condition as SubscriptionTypeOptions[T];
    this.createdAt = new Date(data.created_at);
    this.secret = secret;
    this.callbacks = new SubscriptionCallbackManager(connection, this);

  }


  public onMessage(callback: SubscriptionCallback<T, K>){

    this.callbacks.add(callback);

  }

  public checkSubscriptionType<U extends T>(type: U): this is Subscription<U, K> {
    return this.type === type;
  }

  public async delete() {

    await this.connection.helixClient.deleteSubscription(this.id, this.auth);

    this.connection.subscriptions.delete(this.id);

    return;

  }


}