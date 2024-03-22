import { BaseMessage } from '../BaseMessage';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { ChannelChatMessageEvent } from '../../../interfaces';

export class ChannelMessage<K extends ConnectionTypes> extends BaseMessage<SubscriptionTypes.ChannelChatMessage, K>{

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: ChannelChatMessageEvent){

    super(connection, subscription, data);

  }

}