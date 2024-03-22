import { BaseStream } from '../BaseStream';
import type { SubscriptionTypes } from '../../../enums';
import type { StreamTypes, ConnectionTypes, SubscriptionType } from '../../../types';

export class StreamOnlineStream<K extends ConnectionTypes = ConnectionTypes> extends BaseStream<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.StreamOnline, K>, id: string, type: StreamTypes, started_at: string){
    
    super(connection, subscription, id, type, started_at);
  
  }

}