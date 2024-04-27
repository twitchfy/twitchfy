import { Base } from '../Base';
import { BaseUser } from '../BaseUser';
import type { ChannelAdBreakBeginEvent } from '../../../interfaces';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelAdBreakBeginMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelAdBreakBegin, K> {
   
  public broadcaster: BaseUser<SubscriptionTypes.ChannelAdBreakBegin, K>; 
  public requester: BaseUser<SubscriptionTypes.ChannelAdBreakBegin, K>;
  public duration: number;
  public startedAt: Date;
  public isAutomatic: boolean;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelAdBreakBegin, K>, data: ChannelAdBreakBeginEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.requester = new BaseUser(connection, subscription, { id: data.requester_user_id, login: data.requester_user_login, display_name: data.requester_user_name });  
    this.duration = Number(data.duration_seconds);

    this.startedAt = new Date(data.started_at);

    this.isAutomatic = data.is_automatic;

  }

}