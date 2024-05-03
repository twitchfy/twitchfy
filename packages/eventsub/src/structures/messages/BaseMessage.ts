import { Base } from './Base';
import { Fragment } from './Fragment';
import { MessageReply } from './MessageReply';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, MessageTypes, SubscriptionType } from '../../types';
import type { ChannelChatMessageEvent } from '../../interfaces';


/**
 * The message sent by the ChannelChatMessage event.
 */
export class BaseMessage<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  /**
   * The ID of the message.
   */
  public readonly id: string;

  /**
   * The type of the message.
   */
  public readonly type: MessageTypes;

  /**
   * The content of the message.
   */
  public readonly content: string;

  /**
   * The fragments of the message.
   */
  public readonly fragments: Fragment[];
  
  /**
   * The reply to the message. Null if there is no reply.
   */
  public readonly reply: MessageReply | null;

  /**
   * The number of bits sent with the message.
   */
  public readonly bits: number;

  /**
   * The ID of the channel points reward used to send the message. Null if the message was not sent using a channel points reward.
   */
  public readonly channelRewardId: string | null;

  /**
   * Builds up a BaseMessage.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<T, K>, data: ChannelChatMessageEvent){

    super(connection, subscription);

    this.id = data.message_id;

    this.type = data.message_type;

    this.content = data.message.text;

    this.fragments = data.message.fragments.map((x) => new Fragment(x));

    this.reply = data.reply ? new MessageReply(data.reply) : null;

    this.bits = data.cheer?.bits ?? 0;

    this.channelRewardId = data.channel_points_custom_reward_id ?? null;


  }

}