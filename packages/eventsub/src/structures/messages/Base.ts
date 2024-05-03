import type { SubscriptionType } from '../../types';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes } from '../../types';

/**
 * The base class for all the structures.
 */
export class Base<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  /**
   * The EventSub connection used.
   */
  public readonly connection: K;

  /**
   * The subscription which trigger this message.
   */
  public readonly subscription: SubscriptionType<T, K>;


  /**
   * Builds up a Base message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   */
  public constructor(connection: K, subscription: SubscriptionType<T, K>){

    this.connection = connection;
    this.subscription = subscription;

  }

}