import { Base } from '../Base';
import type { SubscriptionTypes } from '../../../enums/';
import type { ConnectionTypes, SubscriptionType } from '../../../types/';

/**
 * The category of a channel which was updated in the ChannelUpdate event.
 */
export class ChannelUpdateCategory<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelUpdate, K> {
    
  /**
   * The ID of the category.
   */
  public readonly id: string;

  /**
   * The name of the category.
   */
  public readonly name: string;

  /**
   * Builds up a ChannelUpdateCategory.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param id The ID of the category.
   * @param name The name of the category.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelUpdate, K>, id: string, name: string){

    super(connection, subscription);

    this.id = id;

    this.name = name;

  }
}