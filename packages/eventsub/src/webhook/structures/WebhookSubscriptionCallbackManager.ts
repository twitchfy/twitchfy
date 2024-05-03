/* eslint-disable @typescript-eslint/ban-ts-comment */


import type { WebhookConnection } from './WebhookConnection';
import type { WebhookSubscriptionCallback } from '../types';
import type { SubscriptionMessages } from '../../interfaces';
import type { SubscriptionTypes}  from '../../enums';
import type { SubscriptionCallback } from '../../types';


/**
 * The Webhook Subscription Callback Manager.
 */
export class WebhookSubscriptionCallbackManager<T extends SubscriptionTypes>{

  /**
   * The connection used for this subscription.
   */
  public readonly connection: WebhookConnection;

  /**
   * The callbacks for this subscription.
   */
  private callbacks: SubscriptionCallback<T>[];

  /**
   * Builds up a new WebhookSubscriptionCallbackManager.
   * @param connection The connection used for this subscription.
   */
  public constructor(connection: WebhookConnection){

    this.connection = connection;

    this.callbacks = [];
  }

  /**
   * Adds a new callback to the subscription. This callback will be executed when a message within this subscription is received.
   * @param callback The callback to add.
   * @returns The manager.
   */
  public add(callback: WebhookSubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  /**
   * Executes all the callbacks of the subscription.
   * @param message The message to execute the callbacks with.
   * @returns
   */
  public async execute(message: SubscriptionMessages[T]){

    for(const callback of this.callbacks){
    
      await callback(message);
    
    }

  }

}