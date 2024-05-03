import { ChannelChatMessageChatter } from './ChannelChatMessageChatter';
import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import { BaseMessage } from '../BaseMessage';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { ChannelChatMessageEvent } from '../../../interfaces';

/**
 * The message received by the ChannelChatMessage event.
 */
export class ChannelChatMessageMessage<K extends ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatMessage, K>{

  /**
   * The broadcaster of the channel where the chat message was sent.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelChatMessage, K>;
  /**
   * The chatter who sent the message.
   */
  public readonly chatter: ChannelChatMessageChatter<K>;
  /**
   * The message which was sent.
   */
  public readonly message: BaseMessage<SubscriptionTypes.ChannelChatMessage, K>;

  /**
   * Builds up a ChannelChatMessage message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: ChannelChatMessageEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.chatter = new ChannelChatMessageChatter(connection, subscription, { id: data.chatter_user_id, login: data.chatter_user_login, display_name: data.chatter_user_name, badges: data.badges, color: data.color });

    this.message = new BaseMessage(connection, subscription, data);

  }

}