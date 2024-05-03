import type { BaseUserData } from '../BaseUser';
import { BaseUser } from '../BaseUser';
import { Badge } from '../Badge';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { SubscriptionTypes } from '../../../enums';
import type { BadgeData } from '../../../interfaces';

/**
 * The chatter who sent a message in the ChannelChatMessage event.
 */
export class ChannelChatMessageChatter<K extends ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatMessage, K> {

  /**
   * The badges of the chatter.
   */
  public readonly badges: Badge[];

  /**
   * The color of the chatter name.
   */
  public readonly color: string;

  /**
   * Builds up a ChannelChatMessageChatter.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The data of the chatter.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: BaseUserData & { badges: BadgeData[], color: string }){
    super(connection, subscription, data);

    this.badges = data.badges.map(badge => new Badge(badge));

    this.color = data.color;
  }
}