/* eslint-disable @typescript-eslint/ban-ts-comment */


import type { WebhookConnection } from './WebhookConnection';
import type { WebhookSubscriptionCallback } from '../types';
import type { SubscriptionMessages } from '../../interfaces';
import type { SubscriptionTypes}  from '../../enums';
import type { SubscriptionCallback } from '../../types';


export class WebhookSubscriptionCallbackManager<T extends SubscriptionTypes>{

  public connection: WebhookConnection;

  private callbacks: SubscriptionCallback<T>[];

  public constructor(connection: WebhookConnection){

    this.connection = connection;

    this.callbacks = [];
  }

  public add(callback: WebhookSubscriptionCallback<T>): this {
        
    this.callbacks.push(callback);

    return this;

  }

  public execute(message: SubscriptionMessages[T]){

    this.callbacks.forEach((c) => c(message));

  }

}