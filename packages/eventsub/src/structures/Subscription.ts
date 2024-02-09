import type { PostEventSubscriptions } from '@twitchapi/api-types';
import type { TokenAdapter, TokenTypes } from '@twitchapi/helix';
import { SubscriptionCallbackManager } from './SubscriptionCallbackManager';
import type { SubscriptionTypes } from '../enums';
import type { SubscriptionTypeOptions } from '../interfaces';
import type { SubscriptionCallback, ConnectionTypes, SubscriptionOptions } from '../types';
import { WebhookConnection } from '../webhook';
import type { EventSubConnection } from '../ws';

export class Subscription<T extends SubscriptionTypes = SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: K;

  public userToken: K extends EventSubConnection ? TokenAdapter : never;

  public appToken: K extends WebhookConnection ? string : never;

  public id: string;

  public nonce: string | null ;

  public type: T;

  public status: string;

  public version: string;

  public options: SubscriptionTypeOptions[T];

  public createdAt: Date;

  public readonly secret: K extends WebhookConnection ? string: never;

  public readonly callbacks: SubscriptionCallbackManager<T, K>;


  public constructor(connection: K, options: SubscriptionOptions<T, K> , data: PostEventSubscriptions, secret?: K extends WebhookConnection ? string : never){

    this.connection = connection;
    this.userToken = (options as SubscriptionOptions<T, EventSubConnection>).userToken as K extends EventSubConnection ? TokenAdapter<TokenTypes, true> : never ?? undefined as K extends EventSubConnection ? TokenAdapter<TokenTypes, true> : never;
    this.appToken = (options as SubscriptionOptions<T, WebhookConnection>).appToken  as K extends WebhookConnection ? string : never ?? undefined as K extends WebhookConnection ? string : never;
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

    await this.connection.helixClient.deleteSubscription(this.id, { useTokenType: this.connection instanceof WebhookConnection ? 'app' : 'user', userToken: this.userToken });

    this.connection.subscriptions.delete(this.id);

    return;

  }


}