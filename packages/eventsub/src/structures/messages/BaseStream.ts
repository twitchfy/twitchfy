import { Base } from './Base';
import type { SubscriptionType } from '../../types';
import type { SubscriptionTypes } from '../../enums';
import type { StreamTypes, ConnectionTypes } from '../../types';

export class BaseStream<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;
  
  public type: StreamTypes;

  public startedAt: Date;
  
  public constructor(connection: K, subscription: SubscriptionType<T, K>, data: BaseStreamData){
  
    super(connection, subscription);
  
    this.id = data.id;

    this.type = data.type;

    this.startedAt = new Date(data.started_at);

  
  }
  
}

export interface BaseStreamData {
  id: string;
  type: StreamTypes;
  started_at: string;
}