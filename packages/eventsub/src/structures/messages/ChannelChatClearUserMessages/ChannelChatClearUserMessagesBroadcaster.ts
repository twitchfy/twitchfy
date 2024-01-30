import { BaseBroadcaster } from '../BaseBroadcaster';
import type { Subscription } from '../../Subscription';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes } from '../../../types';


export class ChannelChatClearUserMessagesBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}