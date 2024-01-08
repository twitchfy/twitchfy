import { Subscription } from '../Subscription';
import { EventSubConnection } from '../EventSubConnection';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';

export class Base<T extends SubscriptionTypes> {

  public connection: EventSubConnection;

  public subscription: Subscription<T>;


  public constructor(connection: EventSubConnection, subscription: Subscription<T>){

    this.connection = connection;
    this.subscription = subscription;

  }

}