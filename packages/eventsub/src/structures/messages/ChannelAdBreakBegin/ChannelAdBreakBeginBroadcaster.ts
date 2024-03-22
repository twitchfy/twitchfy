import { BaseBroadcaster } from '../BaseBroadcaster';
import type { SubscriptionTypes } from '../../../enums/';
import type { ConnectionTypes, SubscriptionType } from '../../../types/';

export class ChannelAdBreakBeginBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelAdBreakBegin, K> {

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelAdBreakBegin, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}