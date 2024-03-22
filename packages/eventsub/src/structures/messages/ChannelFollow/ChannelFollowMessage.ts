import { ChannelFollowUser } from './ChannelFollowUser';
import { ChannelFollowBroadcaster } from './ChannelFollowBroadcaster';
import { Base } from '../Base';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelFollowEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelFollowMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelFollow, K>{

  public broadcaster: ChannelFollowBroadcaster<K>;

  public follower: ChannelFollowUser<K>;

  public followedAt: Date;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelFollow, K>, data: ChannelFollowEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelFollowBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.follower = new ChannelFollowUser(connection, subscription, data.user_id, data.user_login, data.user_name);

    this.followedAt = new Date(data.followed_at);

  }

}