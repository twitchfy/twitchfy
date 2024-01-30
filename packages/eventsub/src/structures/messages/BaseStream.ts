import { Base } from './Base';
import type { Subscription } from '../Subscription';
import type { SubscriptionTypes } from '../../enums';
import type { StreamTypes, ConnectionTypes } from '../../types';

export class BaseStream<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;
  
  public type: StreamTypes;

  public startedAt: Date;
  
  public constructor(connection: K, subscription: Subscription<T, K>, id: string, type: StreamTypes, started_at: string){
  
    super(connection, subscription);
  
    this.id = id;

    this.type = type;

    this.startedAt = new Date(started_at);
  
    
  
  }
  
}