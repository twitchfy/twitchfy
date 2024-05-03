import { Base } from './Base';
import type { SubscriptionType } from '../../types';
import type { SubscriptionTypes } from '../../enums';
import type { StreamTypes, ConnectionTypes } from '../../types';

/**
 * The base class representing an stream structure.
 */
export class BaseStream<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  /**
   * The ID of the stream.
   */
  public readonly id: string;
  
  /**
   * The type of the stream. Currently, it can only be 'live'.
   */
  public readonly type: StreamTypes;

  /**
   * The Date object when the stream started.
   */
  public readonly startedAt: Date;
  
  /**
   * Builds up a BaseStream.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<T, K>, data: BaseStreamData){
  
    super(connection, subscription);
  
    this.id = data.id;

    this.type = data.type;

    this.startedAt = new Date(data.started_at);

  
  }
  
}

/**
 * The data needed to build up a BaseStream.
 */
export interface BaseStreamData {
  /**
   * The ID of the stream.
   */
  id: string;
  /**
   * The type of the stream. Currently, it can only be 'live'.
   */
  type: StreamTypes;
  /**
   * The ISO String when the stream started.
   */
  started_at: string;
}