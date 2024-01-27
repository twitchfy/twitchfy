import { ChannelFollowUser } from './ChannelFollowUser';
import { ChannelFollowBroadcaster } from './ChannelFollowBroadcaster';
import { Base } from '../Base';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ChannelFollowEvent } from '../../../interfaces/messages/Notification/events/ChannelFollow/ChannelFollowEvent';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class ChannelFollowMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelFollow, K>{

  public broadcaster: ChannelFollowBroadcaster<K>;

  public follower: ChannelFollowUser<K>;

  public followedAt: Date;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelFollow, K>, data: ChannelFollowEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelFollowBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.follower = new ChannelFollowUser(connection, subscription, data.user_id, data.user_login, data.user_name);

    this.followedAt = new Date(data.followed_at);

  }

}