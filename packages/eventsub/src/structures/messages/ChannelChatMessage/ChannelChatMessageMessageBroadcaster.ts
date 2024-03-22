import { BaseBroadcaster } from '../BaseBroadcaster';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { SubscriptionTypes } from '../../../enums';

export class ChannelChatMessageMessageBroadcaster<K extends ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatMessage, K> {
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, id: string, login: string, dislayName: string){
    super(connection, subscription, id, login, dislayName);
  }
}