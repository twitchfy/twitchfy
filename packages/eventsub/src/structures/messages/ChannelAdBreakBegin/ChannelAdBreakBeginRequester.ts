import { BaseRequester } from '../BaseRequester';
import type { Subscription } from '../../Subscription';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes } from '../../../types';

export class ChannelAdBreakBeginRequester<K extends ConnectionTypes = ConnectionTypes> extends BaseRequester<SubscriptionTypes.ChannelAdBreakBegin, K> {

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelAdBreakBegin, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

  }
}