import type { PostEventSubSubscription } from '@twitchfy/api-types';
import { Subscription } from './Subscription';
import type { Conduit } from './Conduit';
import { ConduitSubscriptionCallbackManager } from './ConduitSubscriptionCallbackManager';
import type { ConduitSubscriptionCallback, SubscriptionOptions } from '../types';
import { Events } from '../enums';
import type { SubscriptionTypes } from '../enums';

/**
 * A subscription created within a Conduit.
 */
export class ConduitSubscription<T extends SubscriptionTypes> extends Subscription<T> {

  /**
   * The Conduit that created this subscription.
   */
  public readonly conduit: Conduit;

  /**
   * The callback manager for this subscription.
   */
  public readonly callbacks: ConduitSubscriptionCallbackManager<T>;

  /**
   * Builds up a ConduitSubscription.
   * @param conduit The Conduit that created this subscription.
   * @param options The options for the subscription.
   * @param data The data from the API.
   */
  public constructor(conduit: Conduit, options: SubscriptionOptions<T>, data: PostEventSubSubscription) {
    
    super(options, data);
    
    this.conduit = conduit;

    this.callbacks = new ConduitSubscriptionCallbackManager<T>(conduit);

    this.callbacks.add((message) => this.conduit.emit(Events.SubscriptionMessage, message, this));
    
  }

  /**
   * Adds a callback to the subscription, which will be executed when a message of this subscription is received.
   * @param callback 
   */
  public onMessage(callback: ConduitSubscriptionCallback<T>) {

    this.callbacks.add(callback);

  }

  /**
   * Checks if the subscription is of a certain type.
   * @param type The type to check.
   * @returns Whether the subscription is of the type.
   */
  public checkSubscriptionType<U extends T>(type: U): this is ConduitSubscription<U> {
    return this.type === type;
  }

  /**
   * Deletes the subscription.
   * @returns
   */
  public async delete() {

    await this.conduit.helixClient.deleteEventSubSubscription(this.id);

    this.conduit.subscriptions.delete(this.id);

    await this.conduit.storage?.delete(this.id);

    return;
  }
}