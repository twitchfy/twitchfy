import type { Conduit } from './Conduit';
import type { SubscriptionMessages } from '../interfaces';
import type { ConduitSubscriptionCallback, SubscriptionCallback } from '../types';
import type { SubscriptionTypes } from '../enums';

export class ConduitSubscriptionCallbackManager<T extends SubscriptionTypes> {

  public conduit: Conduit;
    
  private callbacks: SubscriptionCallback<T>[];
  
  public constructor(conduit: Conduit){
  
    this.conduit = conduit;
  
    this.callbacks = [];
  }
  
  public add(callback: ConduitSubscriptionCallback<T>): this {
          
    this.callbacks.push(callback);
  
    return this;
  
  }
  
  public execute(message: SubscriptionMessages[T]){
  
    this.callbacks.forEach((c) => c(message));
  
  }
  
}