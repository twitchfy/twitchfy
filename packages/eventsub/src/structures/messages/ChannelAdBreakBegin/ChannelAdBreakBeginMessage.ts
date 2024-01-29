import { ChannelAdBreakBeginBroadcaster, ChannelAdBreakBeginRequester, Base, Subscription } from '../..';
import { ChannelAdBreakBeginEvent } from '../../../interfaces';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';

export class ChannelAdBreakBeginMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelAdBreakBegin, K> {
   
  public broadcaster: ChannelAdBreakBeginBroadcaster<K>; 
  public requester: ChannelAdBreakBeginRequester<K>;
  public duration: number;
  public startedAt: Date;
  public isAutomatic: boolean;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin, K>, data: ChannelAdBreakBeginEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelAdBreakBeginBroadcaster<K>(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.requester = new ChannelAdBreakBeginRequester(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
    
    this.duration = Number(data.duration_seconds);

    this.startedAt = new Date(data.started_at);

    this.isAutomatic = data.is_automatic;

  }

}