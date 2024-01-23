import { BaseUser } from '../BaseUser';
import { Subscription } from '../../Subscription';
import { EventSubConnection } from '../../EventSubConnection';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';

export class ChannelChatClearUserMessagesUser extends BaseUser<SubscriptionTypes.ChannelChatClearUserMessages> {

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages>, id: string, login: string, dislayName: string) {

    super(connection, subscription, id, login, dislayName);

  }

}