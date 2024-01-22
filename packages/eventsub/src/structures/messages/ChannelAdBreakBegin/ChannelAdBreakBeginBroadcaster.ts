import { BaseBroadcaster } from '../BaseBroadcaster';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';

export class ChannelAdBreakBeginBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelAdBreakBegin> {

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}