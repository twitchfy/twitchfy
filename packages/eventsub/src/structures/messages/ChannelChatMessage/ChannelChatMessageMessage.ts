import { ChannelChatMessageChatter } from './ChannelChatMessageChatter';
import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import { BaseMessage } from '../BaseMessage';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { ChannelChatMessageEvent } from '../../../interfaces';

export class ChannelChatMessageMessage<K extends ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatMessage, K>{

  public broadcaster: BaseUser<SubscriptionTypes.ChannelChatMessage, K>;
  public chatter: ChannelChatMessageChatter<K>;
  public message: BaseMessage<SubscriptionTypes.ChannelChatMessage, K>;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: ChannelChatMessageEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.chatter = new ChannelChatMessageChatter(connection, subscription, { id: data.chatter_user_id, login: data.chatter_user_login, display_name: data.chatter_user_name, badges: data.badges, color: data.color });

    this.message = new BaseMessage(connection, subscription, data);

  }

}