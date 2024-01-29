import { BaseRequester, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';

export class ChannelAdBreakBeginRequester<K extends ConnectionTypes = ConnectionTypes> extends BaseRequester<SubscriptionTypes.ChannelAdBreakBegin, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}