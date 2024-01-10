import { PostEventSubscriptions } from '@twitchapi/api-types';
import { SubscriptionCallbackManager } from './SubscriptionCallbackManager';
import { EventSubConnection } from './EventSubConnection';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { SubscriptionOptions } from '../interfaces/SubscriptionOptions';
import { SubscriptionCallback } from '../types/SubscriptionCallback';

export class Subscription<T extends SubscriptionTypes = SubscriptionTypes> {

  public connection: EventSubConnection;

  public auth: string;

  public id: string;

  public type: T;

  public status: string;

  public version: string;

  public options: SubscriptionOptions[T];

  public createdAt: Date;

  public readonly callbacks: SubscriptionCallbackManager<T>;


  public constructor(connection: EventSubConnection, auth: string, subscriptionType: T, data: PostEventSubscriptions){

    this.connection = connection;
    this.auth = auth;
    this.type = subscriptionType;
    this.id = data.id;
    this.status = data.status;
    this.version = data.version;
    this.options = data.condition as SubscriptionOptions[T];
    this.createdAt = new Date(data.created_at);
    this.callbacks = new SubscriptionCallbackManager(connection, this);

  }


  public onMessage(callback: SubscriptionCallback<T>){

    this.callbacks.add(callback);

  }

  public async delete() {

    await this.connection.helixClient.deleteSubscription(this.id, this.auth);

    this.connection.subscriptions.delete(this.id);

    return;

  }


}