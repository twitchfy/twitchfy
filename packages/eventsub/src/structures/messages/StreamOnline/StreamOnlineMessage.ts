import { StreamOnlineStream } from './StreamOnlineStream';
import { StreamOnlineBroadcaster } from './StreamOnlineBroadcaster';
import { Base } from '../Base';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { EventSubConnection } from 'structures/EventSubConnection';
import { Subscription } from 'structures/Subscription';
import { StreamOnlineEvent } from 'interfaces/messages/Notification/events/StreamOnline/StreamOnlineEvent';


export class StreamOnlineMessage extends Base<SubscriptionTypes.StreamOnline>{

  public broadcaster: StreamOnlineBroadcaster;
  public stream: StreamOnlineStream;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, data: StreamOnlineEvent){

    super(connection, subscription);

    this.broadcaster = new StreamOnlineBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.stream = new StreamOnlineStream(connection, subscription, data.id, data.type, data.started_at);

  }

}