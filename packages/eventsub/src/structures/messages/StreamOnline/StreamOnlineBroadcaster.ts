import { BaseBroadcaster } from '../BaseBroadcaster';
import type { Subscription } from '../../Subscription';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes } from '../../../types';


export class StreamOnlineBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, id: string, login: string, displayName: string){
        
    super(connection, subscription, id, login, displayName);
  }

}