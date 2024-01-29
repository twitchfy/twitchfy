import { BaseBroadcaster, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';


export class StreamOnlineBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, id: string, login: string, displayName: string){
        
    super(connection, subscription, id, login, displayName);
  }

}