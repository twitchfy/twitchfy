import { BaseUser, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';

export class ChannelChatClearUserMessagesUser<K extends ConnectionTypes = ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, dislayName: string) {

    super(connection, subscription, id, login, dislayName);

  }

}