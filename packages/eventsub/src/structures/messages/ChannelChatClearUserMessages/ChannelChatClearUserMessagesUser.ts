import { BaseUser } from '../BaseUser';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class ChannelChatClearUserMessagesUser<K extends ConnectionTypes = ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, dislayName: string) {

    super(connection, subscription, id, login, dislayName);

  }

}