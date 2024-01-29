import { BaseStream, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { StreamTypes, ConnectionTypes } from '../../../types';

export class StreamOnlineStream<K extends ConnectionTypes = ConnectionTypes> extends BaseStream<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, id: string, type: StreamTypes, started_at: string){
    
    super(connection, subscription, id, type, started_at);
  
  }

}