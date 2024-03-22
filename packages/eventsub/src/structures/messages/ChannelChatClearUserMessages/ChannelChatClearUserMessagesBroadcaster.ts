import { BaseBroadcaster } from '../BaseBroadcaster';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


export class ChannelChatClearUserMessagesBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}