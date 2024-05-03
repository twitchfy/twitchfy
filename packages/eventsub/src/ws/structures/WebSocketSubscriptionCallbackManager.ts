/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { WebSocketConnection } from './WebSocketConnection';
import type { WebSocketSubscriptionCallback } from '../types';
import type { SubscriptionMessages } from '../../interfaces';
import type { SubscriptionTypes}  from '../../enums';
import type { SubscriptionCallback } from '../../types';

/**
 * The callback manager for a WebSocketSubscription.
 */
export class WebSocketSubscriptionCallbackManager<T extends SubscriptionTypes>{

  /**
   * The connection that created this manager.
   */
  public readonly connection: WebSocketConnection;

  /**
   * The callbacks for this manager.
   */
  private callbacks: SubscriptionCallback<T>[];

  /**
   * Creates a new WebSocketSubscriptionCallbackManager.
   * @param connection The connection that created this manager.
   */
  public constructor(connection: WebSocketConnection){

    this.connection = connection;

    this.callbacks = [];
  }

  /**
   * Adds a callback to the manager.
   * @param callback The callback to add.
   * @returns The manager.
   */
  public add(callback: WebSocketSubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  /**
   * Executes all the callbacks with the message.
   * @param message The message to execute the callbacks with.
   */
  public async execute(message: SubscriptionMessages<WebSocketConnection>[T]){

    for await(const callback of this.callbacks){
      await callback(message);
    }

  }

}