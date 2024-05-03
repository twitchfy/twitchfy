import type { PostEventSubSubscription } from '@twitchfy/api-types';
import { WebhookSubscriptionCallbackManager } from './WebhookSubscriptionCallbackManager';
import type { WebhookConnection } from './WebhookConnection';
import type { WebhookSubscriptionCallback } from '../types';
import { Events } from '../../enums';
import type { SubscriptionTypes } from '../../enums';
import { Subscription } from '../../structures/Subscription';
import type { SubscriptionOptions } from '../../types';


/**
 * A subscription created within a WebhookConnection.
 */
export class WebhookSubscription<T extends SubscriptionTypes = SubscriptionTypes> extends Subscription<T> {

  /**
   * The connection used for this subscription.
   */
  public readonly connection: WebhookConnection;

  /**
   * The secret used for creating this subscription.
   */
  public readonly secret: string;

  /**
   * The callbacks for this subscription.
   */
  public readonly callbacks: WebhookSubscriptionCallbackManager<T>;

  /**
   * Builds up a new WebhookSubscription.
   * @param connection The connection used for this subscription.
   * @param options The options for the subscription.
   * @param data The data for the subscription.
   * @param secret The secret used for creating this subscription.
   */
  public constructor(connection: WebhookConnection, options: SubscriptionOptions<T>, data: PostEventSubSubscription, secret: string) {

    super(options, data);

    this.connection = connection;

    this.secret = secret;

    this.callbacks = new WebhookSubscriptionCallbackManager<T>(connection);

    this.callbacks.add((message) => this.connection.emit(Events.SubscriptionMessage, message, this));

    if(this.connection.debug) this.callbacks.add((message) => this.connection.makeDebug(`Received a message (${this.type}) from subscription ${message.subscription.id}}`));

  }

  /**
   * Adds a new callback to the subscription. This callback will be executed when a message within this subscription is received.
   * @param callback The callback to add.
   * @returns
   */
  public onMessage(callback: WebhookSubscriptionCallback<T>) {

    this.callbacks.add(callback);

  }

  /**
   * Checks if the subscription is of a specific type.
   * @param type The type to check.
   * @returns Whether the subscription is of the type.
   */
  public checkSubscriptionType<U extends T>(type: U): this is WebhookSubscription<U> {
    return this.type === type;
  }

  /**
   * Deletes the subscription.
   */
  public async delete() {

    await this.connection.helixClient.deleteEventSubSubscription(this.id);

    this.connection.subscriptions.delete(this.id);

    await this.connection.storage?.delete(this.id);

    this.connection.makeDebug(`Deleted subscription (${this.id})`);

    return;

  }

}