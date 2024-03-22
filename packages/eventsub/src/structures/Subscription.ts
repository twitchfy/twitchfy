import type { PostEventSubSubscription } from '@twitchapi/api-types';
import type { SubscriptionOptions } from '../types';
import type { SubscriptionTypes } from '../enums';
import type { SubscriptionTypeOptions } from '../interfaces';

export class Subscription<T extends SubscriptionTypes = SubscriptionTypes> {

  public readonly id: string;

  public readonly type: T;

  public nonce: string | null;

  public status: string;

  public readonly version: string;

  public readonly options: SubscriptionTypeOptions[T];

  public readonly createdAt: Date;

  public readonly cost: number;


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