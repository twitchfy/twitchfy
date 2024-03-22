/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { WebSocketConnection } from './WebSocketConnection';
import type { WebSocketSubscriptionCallback } from '../types';
import type { SubscriptionMessages } from '../../interfaces';
import type { SubscriptionTypes}  from '../../enums';
import type { SubscriptionCallback } from '../../types';

export class WebSocketSubscriptionCallbackManager<T extends SubscriptionTypes>{

  public connection: WebSocketConnection;

  private callbacks: SubscriptionCallback<T>[];

  public constructor(connection: WebSocketConnection){

    this.connection = connection;

    this.callbacks = [];
  }

  public add(callback: WebSocketSubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  public execute(message: SubscriptionMessages<WebSocketConnection>[T]){

    this.callbacks.forEach((c) => c(message));

  }

}