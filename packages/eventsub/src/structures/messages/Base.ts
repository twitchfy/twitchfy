import { Subscription } from '../Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../types/ConnectionTypes';

export class Base<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: K;

  public subscription: Subscription<T, K>;


  public constructor(connection: K, subscription: Subscription<T, K>){

    this.connection = connection;
    this.subscription = subscription;

  }

}