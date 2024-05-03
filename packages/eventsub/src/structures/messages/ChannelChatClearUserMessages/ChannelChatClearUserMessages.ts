import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelChatClearUserMessagesEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

/**
 * The message received by the ChannelChatClearUserMessages event.
 */
export class ChannelChatClearUserMessagesMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatClearUserMessages, K>{

  /**
   * The broadcaster of the channel where the user chat messages were cleared.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K>;
    
  /**
   * The user whose messages were cleared.
   */
  public readonly user: BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K>;

  /**
   * Builds up a ChannelChatClearUserMessages message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClearUserMessages, K>, data: ChannelChatClearUserMessagesEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });
    this.user = new BaseUser(connection, subscription, { id: data.target_user_id, login: data.target_user_login, display_name: data.target_user_name });

  }

}