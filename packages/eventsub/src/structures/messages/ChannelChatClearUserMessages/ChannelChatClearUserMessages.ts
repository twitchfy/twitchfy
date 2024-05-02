import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelChatClearUserMessagesEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelChatClearUserMessagesMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatClearUserMessages, K>{

  public broadcaster: BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K>;
    
  public user: BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K>;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClearUserMessages, K>, data: ChannelChatClearUserMessagesEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });
    this.user = new BaseUser(connection, subscription, { id: data.target_user_id, login: data.target_user_login, display_name: data.target_user_name });

  }

}