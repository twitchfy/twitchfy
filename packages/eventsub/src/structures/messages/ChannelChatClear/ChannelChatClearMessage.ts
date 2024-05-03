import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelChatClearEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

/**
 * The message received by the ChannelChatClear event.
 */
export class ChannelChatClearMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatClear, K>{

  /**
   * The broadcaster of the channel where the chat was cleared.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelChatClear, K>;

  /**
   * Builds up a ChannelChatClear message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClear, K>, data: ChannelChatClearEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });
  
  }

}