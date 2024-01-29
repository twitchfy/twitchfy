import { BaseBroadcaster, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';

export class ChannelChatClearBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatClear, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClear, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}