import { BaseBroadcaster } from '../BaseBroadcaster';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';

export class ChannelChatClearBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelChatClear> {

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClear>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}