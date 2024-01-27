import { BaseBroadcaster } from '../BaseBroadcaster';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../../types/ConnectionTypes';


export class StreamOnlineBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, id: string, login: string, displayName: string){
        
    super(connection, subscription, id, login, displayName);
  }

}