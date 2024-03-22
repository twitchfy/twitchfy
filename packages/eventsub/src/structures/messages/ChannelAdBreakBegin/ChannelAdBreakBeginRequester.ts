import { BaseRequester } from '../BaseRequester';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelAdBreakBeginRequester<K extends ConnectionTypes = ConnectionTypes> extends BaseRequester<SubscriptionTypes.ChannelAdBreakBegin, K> {

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelAdBreakBegin, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}