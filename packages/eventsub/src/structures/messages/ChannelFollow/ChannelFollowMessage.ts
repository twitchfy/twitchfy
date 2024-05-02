import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelFollowEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelFollowMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelFollow, K>{

  public broadcaster: BaseUser<SubscriptionTypes.ChannelFollow, K>;

  public follower: BaseUser<SubscriptionTypes.ChannelFollow, K>;

  public followedAt: Date;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelFollow, K>, data: ChannelFollowEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.follower = new BaseUser(connection, subscription, { id: data.user_id, login: data.user_login, display_name: data.user_name });

    this.followedAt = new Date(data.followed_at);

  }

}