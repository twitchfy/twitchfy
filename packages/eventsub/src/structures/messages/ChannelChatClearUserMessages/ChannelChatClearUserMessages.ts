import { ChannelChatClearUserMessagesBroadcaster } from './ChannelChatClearUserMessagesBroadcaster';
import { ChannelChatClearUserMessagesUser } from './ChannelChatClearUserMessagesUser';
import { Base } from '../Base';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ChannelChatClearUserMessagesEvent } from '../../../interfaces/messages/Notification/events/ChannelChatClearUserMessages/ChannelChatClearUserMessagesEvent';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class ChannelChatClearUserMessagesMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public broadcaster: ChannelChatClearUserMessagesBroadcaster<K>;
    
  public user: ChannelChatClearUserMessagesUser<K>;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages, K>, data: ChannelChatClearUserMessagesEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatClearUserMessagesBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);
    
    this.user = new ChannelChatClearUserMessagesUser(connection, subscription, data.target_user_id, data.target_user_login, data.target_user_name);

  }

}