import { BaseUser } from '../BaseUser';

import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelChatClearUserMessagesUser<K extends ConnectionTypes = ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatClearUserMessages, K> {

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClearUserMessages, K>, id: string, login: string, dislayName: string) {

    super(connection, subscription, id, login, dislayName);

  }

}