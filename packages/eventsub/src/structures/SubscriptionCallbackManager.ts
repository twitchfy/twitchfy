import { Subscription } from './Subscription';
import { EventSubConnection } from './EventSubConnection';
import { SubscriptionMessages } from '../interfaces/SubscriptionMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { SubscriptionCallback } from '../types/SubscriptionCallback';

export class SubscriptionCallbackManager<T extends SubscriptionTypes> {

  public connection: EventSubConnection;

  public subscription: Subscription<T>;

  private callbacks: SubscriptionCallback<T>[];

  public constructor(connection: EventSubConnection, subscription: Subscription<T>){

    this.connection = connection;

    this.subscription = subscription;

    this.callbacks = [];
  }

  public add(callback: SubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  public execute(message: SubscriptionMessages[T]){

    this.callbacks.forEach(async(c) => await c(message));

  }

}