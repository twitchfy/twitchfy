import type { SubscriptionType } from '../../types';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes } from '../../types';

export class Base<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: K;

  public subscription: SubscriptionType<T, K>;


  public constructor(connection: K, subscription: SubscriptionType<T, K>){

    this.connection = connection;
    this.subscription = subscription;

  }

}