import { ChannelChatMessageMessageBroadcaster } from './ChannelChatMessageMessageBroadcaster';
import { ChannelChatMessageMessageChatter } from './ChannelChatMessageMessageChatter';
import { ChannelMessage } from './ChannelMessage';
import { Base } from '../Base';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { ChannelChatMessageEvent } from '../../../interfaces';

export class ChannelChatMessageMessage<K extends ConnectionTypes> extends Base<SubscriptionTypes.ChannelChatMessage, K> {

  public broadcaster: ChannelChatMessageMessageBroadcaster<K>;
  public chatter: ChannelChatMessageMessageChatter<K>;
  public message: ChannelMessage<K>;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: ChannelChatMessageEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelChatMessageMessageBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.chatter = new ChannelChatMessageMessageChatter(connection, subscription, data.chatter_user_id, data.chatter_user_login, data.chatter_user_name, data.color, data.badges);

    this.message = new ChannelMessage(connection, subscription, data);


  }

}