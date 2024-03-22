import { BaseBroadcaster } from '../BaseBroadcaster';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelChatClearBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatClear, K> {

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClear, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}