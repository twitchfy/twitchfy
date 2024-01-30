import type { Subscription } from './Subscription';
import type { SubscriptionMessages } from '../interfaces';
import type { SubscriptionTypes} from '../enums';
import { Events } from '../enums';
import type { SubscriptionCallback, ConnectionTypes } from '../types';


export class SubscriptionCallbackManager<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> {

  public connection: ConnectionTypes;

  public subscription: Subscription<T, K>;

  private callbacks: SubscriptionCallback<T>[];

  public constructor(connection: K, subscription: Subscription<T, K>){

    this.connection = connection;

    this.subscription = subscription;

    this.callbacks = [(message: SubscriptionMessages<K>[T]) => this.connection.emit(Events.SubscriptionMessage, message, this.subscription)];
  }

  public add(callback: SubscriptionCallback<T, K>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  public execute(message: SubscriptionMessages[T]){

    this.callbacks.forEach((c) => c(message));

  }

}