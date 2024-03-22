import { Base } from './Base';
import { Fragment } from './Fragment';
import { MessageReply } from './MessageReply';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, MessageTypes, SubscriptionType } from '../../types';
import type { ChannelChatMessageEvent } from '../../interfaces';


export class BaseMessage<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;

  public type: MessageTypes;

  public content: string;

  public fragments: Fragment[];
  
  public reply: MessageReply;

  public bits: number;

  public channelRewardId: string | null;

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