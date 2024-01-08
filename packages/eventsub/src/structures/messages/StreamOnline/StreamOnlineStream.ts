import { BaseStream } from '../BaseStream';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { StreamTypes } from '../../../interfaces/StreamTypes';

export class StreamOnlineStream extends BaseStream<SubscriptionTypes.StreamOnline>{

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, id: string, type: StreamTypes, started_at: string){
    
    super(connection, subscription, id, type, started_at);
  
  }

}