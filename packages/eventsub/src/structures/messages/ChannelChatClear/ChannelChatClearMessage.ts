import { ChannelChatClearBroadcaster } from './ChannelChatClearBroadcaster';
import { Base } from '../Base';
import type { Subscription } from '../../Subscription';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelChatClearEvent } from '../../../interfaces';
import type { ConnectionTypes } from '../../../types';

export class ChannelChatClearMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelChatClear, K>{

  public broadcaster: ChannelChatClearBroadcaster<K>;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClear, K>, data: ChannelChatClearEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatClearBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
  
  }

}