import { StreamOnlineStream, StreamOnlineBroadcaster, Base, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { StreamOnlineEvent } from '../../../interfaces';
import { ConnectionTypes } from '../../../types';


export class StreamOnlineMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.StreamOnline, K>{

  public broadcaster: StreamOnlineBroadcaster<K>;
  public stream: StreamOnlineStream<K>;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, data: StreamOnlineEvent){

    super(connection, subscription);

    this.broadcaster = new StreamOnlineBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.stream = new StreamOnlineStream(connection, subscription, data.id, data.type, data.started_at);

  }

}