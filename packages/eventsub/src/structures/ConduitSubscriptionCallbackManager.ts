import type { Conduit } from './Conduit';
import type { SubscriptionMessages } from '../interfaces';
import type { ConduitSubscriptionCallback, SubscriptionCallback } from '../types';
import type { SubscriptionTypes } from '../enums';

/**
 * The callback manager for a ConduitSubscription.
 */
export class ConduitSubscriptionCallbackManager<T extends SubscriptionTypes> {

  /**
   * The Conduit that created this manager.
   */
  public readonly conduit: Conduit;
    
  /**
   * The callbacks for this manager.
   */
  private callbacks: SubscriptionCallback<T>[];
  
  public constructor(conduit: Conduit){
  
    this.conduit = conduit;
  
    this.callbacks = [];
  }
  
  /**
   * Adds a callback to the manager.
   * @param callback The callback to add.
   * @returns The manager.
   */
  public add(callback: ConduitSubscriptionCallback<T>): this {
          
    this.callbacks.push(callback);
  
    return this;
  
  }
  
  /**
   * Executes all the callbacks with the message.
   * @param message The message to execute the callbacks with.
   */
  public async execute(message: SubscriptionMessages[T]){
  
    for(const callback of this.callbacks){
    
      await callback(message);
    
    }
  
  }
  
}