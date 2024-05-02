import { Base } from './Base';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../types';
import type { SubscriptionMessages } from '../../interfaces';

export class BaseSubscriptionMessage<T extends SubscriptionTypes, K extends ConnectionTypes> extends Base<T, K> {
  public constructor(connection: K, subscription: SubscriptionType<T, K>){
    super(connection, subscription);
  }

  public checkSubscriptionType<U extends SubscriptionTypes = SubscriptionTypes>(type: U): this is SubscriptionMessages<K>[U]{
    return this.subscription.checkSubscriptionType(type as unknown as T);
  }
}