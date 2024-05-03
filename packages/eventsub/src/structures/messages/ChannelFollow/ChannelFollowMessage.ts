import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelFollowEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

/**
 * The message received by the ChannelFollow event.
 */
export class ChannelFollowMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelFollow, K>{

  /**
   * The broadcaster of the channel who was followed.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelFollow, K>;

  /**
   * The follower who followed the channel.
   */
  public readonly follower: BaseUser<SubscriptionTypes.ChannelFollow, K>;

  /**
   * The Date object when the follow occurred.
   */
  public readonly followedAt: Date;

  /**
   * Builds up a ChannelFollow message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelFollow, K>, data: ChannelFollowEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.follower = new BaseUser(connection, subscription, { id: data.user_id, login: data.user_login, display_name: data.user_name });

    this.followedAt = new Date(data.followed_at);

  }

}