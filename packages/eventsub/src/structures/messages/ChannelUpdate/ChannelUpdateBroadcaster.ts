import { BaseBroadcaster } from '../BaseBroadcaster';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


export class ChannelUpdateBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelUpdate, K>{

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelUpdate, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);


  }

}