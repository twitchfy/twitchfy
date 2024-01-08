import { Base } from './Base';
import { EventSubConnection } from '../EventSubConnection';
import { Subscription } from '../Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { StreamTypes } from '../../types/StreamTypes';

export class BaseStream<T extends SubscriptionTypes> extends Base<T> {

  public id: string;
  
  public type: StreamTypes;

  public startedAt: Date;
  
  public constructor(connection: EventSubConnection, subscription: Subscription<T>, id: string, type: StreamTypes, started_at: string){
  
    super(connection, subscription);
  
    this.id = id;

    this.type = type;

    this.startedAt = new Date(started_at);
  
    
  
  }
  
}