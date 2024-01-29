import { BaseBroadcaster, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums/';
import { ConnectionTypes } from '../../../types/';

export class ChannelAdBreakBeginBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelAdBreakBegin, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}