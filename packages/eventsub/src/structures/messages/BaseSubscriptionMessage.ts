import { Base } from './Base';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../types';
import type { SubscriptionMessages } from '../../interfaces';

/**
 * The base class for all the subscription messages.
 */
export class BaseSubscriptionMessage<T extends SubscriptionTypes, K extends ConnectionTypes> extends Base<T, K> {
  /**
   * Builds up a BaseSubscriptionMessage.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   */
  public constructor(connection: K, subscription: SubscriptionType<T, K>){
    super(connection, subscription);
  }

  /**
   * Checks whether the message is of a certain type.
   * @param type The type to check.
   * @returns Whether the message is of the type.
   */
  public checkMessageType<U extends SubscriptionTypes = SubscriptionTypes>(type: U): this is SubscriptionMessages<K>[U]{
    return this.subscription.checkSubscriptionType(type as unknown as T);
  }
}