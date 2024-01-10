import { ChannelChatClearBroadcaster } from './ChannelChatClearBroadcaster';
import { Base } from '../Base';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { EventSubConnection } from '../../../structures/EventSubConnection';
import { Subscription } from '../../../structures/Subscription';
import { ChannelChatClearEvent } from '../../../interfaces/messages/Notification/events/ChannelChatClear/ChannelChatClearEvent';

export class ChannelChatClearMessage extends Base<SubscriptionTypes.ChannelChatClear>{

  public broadcaster: ChannelChatClearBroadcaster;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClear>, data: ChannelChatClearEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatClearBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
  
  }

}