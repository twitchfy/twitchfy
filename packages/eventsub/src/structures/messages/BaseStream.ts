import { Base } from './Base';
import { Subscription } from '../Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { StreamTypes } from '../../types/StreamTypes';
import { ConnectionTypes } from '../../types/ConnectionTypes';

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