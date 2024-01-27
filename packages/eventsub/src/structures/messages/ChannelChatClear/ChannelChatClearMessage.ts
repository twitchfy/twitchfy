import { ChannelChatClearBroadcaster } from './ChannelChatClearBroadcaster';
import { Base } from '../Base';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { Subscription } from '../../../structures/Subscription';
import { ChannelChatClearEvent } from '../../../interfaces/messages/Notification/events/ChannelChatClear/ChannelChatClearEvent';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class ChannelChatClearMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelChatClear, K>{

  public broadcaster: ChannelChatClearBroadcaster<K>;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClear, K>, data: ChannelChatClearEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatClearBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
  
  }

}