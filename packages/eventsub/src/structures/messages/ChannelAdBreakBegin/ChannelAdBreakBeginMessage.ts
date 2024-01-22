import { ChannelAdBreakBeginBroadcaster } from './ChannelAdBreakBeginBroadcaster';
import { ChannelAdBreakBeginRequester } from './ChannelAdBreakBeginRequester';
import { Base } from '../Base';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { ChannelAdBreakBeginEvent } from '../../../interfaces/messages/Notification/events/ChannelAdBreakBegin/ChannelAdBreakBeginEvent';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';

export class ChannelAdBreakBeginMessage extends Base<SubscriptionTypes.ChannelAdBreakBegin> {
   
  public broadcaster: ChannelAdBreakBeginBroadcaster; 
  public requester: ChannelAdBreakBeginRequester;
  public duration: number;
  public startedAt: Date;
  public isAutomatic: boolean;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin>, data: ChannelAdBreakBeginEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelAdBreakBeginBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.requester = new ChannelAdBreakBeginRequester(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
    
    this.duration = Number(data.duration_seconds);

    this.startedAt = new Date(data.started_at);

    this.isAutomatic = data.is_automatic;

  }

}