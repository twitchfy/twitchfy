import { BaseStream } from '../BaseStream';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { StreamTypes } from '../../../types/StreamTypes';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class StreamOnlineStream<K extends ConnectionTypes = ConnectionTypes> extends BaseStream<SubscriptionTypes.StreamOnline, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.StreamOnline, K>, id: string, type: StreamTypes, started_at: string){
    
    super(connection, subscription, id, type, started_at);
  
  }

}