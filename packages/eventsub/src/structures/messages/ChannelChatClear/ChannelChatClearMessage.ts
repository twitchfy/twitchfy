import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelChatClearEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelChatClearMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelChatClear, K>{

  public broadcaster: BaseUser<SubscriptionTypes.ChannelChatClear, K>;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatClear, K>, data: ChannelChatClearEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });
  
  }

}