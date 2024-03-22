import type { PostEventSubSubscription } from '@twitchapi/api-types';
import { WebhookSubscriptionCallbackManager } from './WebhookSubscriptionCallbackManager';
import type { WebhookConnection } from './WebhookConnection';
import type { WebhookSubscriptionCallback } from '../types';
import { Events } from '../../enums';
import type { SubscriptionTypes } from '../../enums';
import { Subscription } from '../../structures/Subscription';
import type { SubscriptionOptions } from '../../types';


export class WebhookSubscription<T extends SubscriptionTypes = SubscriptionTypes> extends Subscription<T> {

  public readonly connection: WebhookConnection;

  public readonly secret: string;

  public callbacks: WebhookSubscriptionCallbackManager<T>;

  public constructor(connection: WebhookConnection, options: SubscriptionOptions<T>, data: PostEventSubSubscription, secret: string) {

    super(options, data);

    this.connection = connection;

    this.secret = secret;

    this.callbacks = new WebhookSubscriptionCallbackManager<T>(connection);

    this.callbacks.add((message) => this.connection.emit(Events.SubscriptionMessage, message, this));

    if(this.connection.debug) this.callbacks.add((message) => this.connection.makeDebug(`Received a message (${this.type}) from subscription ${message.subscription.id}}`));

  }

  public onMessage(callback: WebhookSubscriptionCallback<T>) {

    this.callbacks.add(callback);

  }

  public checkSubscriptionType<U extends T>(type: U): this is WebhookSubscription<U> {
    return this.type === type;
  }

  public async delete() {

    await this.connection.helixClient.deleteSubscription(this.id);

    this.connection.subscriptions.delete(this.id);

    await this.connection.storage?.delete(this.id);

    this.connection.makeDebug(`Deleted subscription (${this.id})`);

    return;

  }

}