import { Subscription } from '..';
import { SubscriptionTypes } from '../../enums';
import { ConnectionTypes } from '../../types';

export class Base<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: K;

  public subscription: Subscription<T, K>;


  public constructor(connection: K, subscription: Subscription<T, K>){

    this.connection = connection;
    this.subscription = subscription;

  }

}