import { BaseBroadcaster, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';


export class ChannelChatClearUserMessagesBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}