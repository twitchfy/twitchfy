import type { PostEventSubSubscription } from '@twitchfy/api-types';
import type { SubscriptionOptions } from '../types';
import type { SubscriptionTypes } from '../enums';
import type { SubscriptionTypeOptions } from '../interfaces';

/**
 * A base subscription. Used as a parent of every type of subscription.
 */
export class Subscription<T extends SubscriptionTypes = SubscriptionTypes> {

  /**
   * The ID of the subscription.
   */
  public readonly id: string;

  /**
   * The type of the subscription.
   */
  public readonly type: T;

  /**
   * The nonce of the subscription. An unique identifier which you can set to separate same type subscriptions.
   */
  public nonce: string | null;

  /**
   * The status of the subscription. Normally is 'enabled'.
   */
  public status: string;

  /**
   * The version of the subscription. This version is the latest version of the subscription type.
   */
  public readonly version: string;

  /**
   * The options used to create the subscription.
   */
  public readonly options: SubscriptionTypeOptions[T];

  /**
   * The date when the subscription was created.
   */
  public readonly createdAt: Date;

  /**
   * The cost of the subscription. If the subscription doesn't needs an authorization this could be 1 (or 0 if the target user has authorized within your application) if not it will be 0. Maximum accumulated cost for webhooks subscriptions is 10000 while for websocket subscriptions is 3.
   */
  public readonly cost: number;


  /**
   * Builds up a Base Subscription.
   * @param options The options for the subscription.
   * @param data The data from the API.
   */ 
  public constructor(options: SubscriptionOptions<T>, data: PostEventSubSubscription){

    this.id = data.id;

    this.type = options.type;

    this.nonce = options.nonce ?? null;

    this.status = data.status;

    this.version = data.version;

    this.options = data.condition as SubscriptionTypeOptions[T];

    this.createdAt = new Date(data.created_at);

    this.cost = data.cost;
  }
}