import { BaseBroadcaster } from '../BaseBroadcaster';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';


export class ChannelChatClearUserMessagesBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelChatClearUserMessages> {

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClearUserMessages>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }

}