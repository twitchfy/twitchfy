import { ChannelFollowUser } from './ChannelFollowUser';
import { Base } from '../Base';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { EventSubConnection } from '../../EventSubConnection';
import { ChannelFollowEvent } from '../../../interfaces/messages/Notification/events/ChannelFollow/ChannelFollowEvent';
import { ChannelFollowBroadcaster } from './ChannelFollowBroadcaster';

export class ChannelFollowMessage extends Base<SubscriptionTypes.ChannelFollow>{

  public broadcaster: ChannelFollowBroadcaster;

  public follower: ChannelFollowUser;

  public followedAt: Date;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelFollow>, data: ChannelFollowEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelFollowBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.follower = new ChannelFollowUser(connection, subscription, data.user_id, data.user_login, data.user_name);

    this.followedAt = new Date(data.followed_at);

  }

}