import { ChannelChatClearUserMessagesBroadcaster } from './ChannelChatClearUserMessagesBroadcaster';
import { ChannelChatClearUserMessagesUser } from './ChannelChatClearUserMessagesUser';
import { Base } from '../Base';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ChannelChatClearUserMessagesEvent } from '../../../interfaces/messages/Notification/events/ChannelChatClearUserMessages/ChannelChatClearUserMessagesEvent';

export class ChannelChatClearUserMessagesMessage extends Base<SubscriptionTypes.ChannelChatClearUserMessages> {

  public broadcaster: ChannelChatClearUserMessagesBroadcaster;
    
  public user: ChannelChatClearUserMessagesUser;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages>, data: ChannelChatClearUserMessagesEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatClearUserMessagesBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
    
    this.user = new ChannelChatClearUserMessagesUser(connection, subscription, data.target_user_id, data.target_user_login, data.target_user_name);

  }

}