import { BaseBroadcaster } from '../BaseBroadcaster';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


export class StreamOnlineBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.StreamOnline, K>, id: string, login: string, displayName: string){
        
    super(connection, subscription, id, login, displayName);
  }

}