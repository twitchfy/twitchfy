import { Subscription } from './Subscription';
import { EventSubConnection } from './EventSubConnection';
import { SubscriptionMessages } from '../interfaces/SubscriptionMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { Events } from '../enums/Events';
import { SubscriptionCallback } from '../types/SubscriptionCallback';

export class SubscriptionCallbackManager<T extends SubscriptionTypes> {

  public connection: EventSubConnection;

  public subscription: Subscription<T>;

  private callbacks: SubscriptionCallback<T>[];

  public constructor(connection: EventSubConnection, subscription: Subscription<T>){

    this.connection = connection;

    this.subscription = subscription;

    this.callbacks = [(message: SubscriptionMessages[T]) => this.connection.emit(Events.SubscriptionMessage, message, this.subscription)];
  }

  public add(callback: SubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  public execute(message: SubscriptionMessages[T]){

    this.callbacks.forEach(async(c) => await c(message));

  }

}