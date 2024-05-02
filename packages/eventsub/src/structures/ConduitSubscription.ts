import type { PostEventSubSubscription } from '@twitchfy/api-types';
import { Subscription } from './Subscription';
import type { Conduit } from './Conduit';
import { ConduitSubscriptionCallbackManager } from './ConduitSubscriptionCallbackManager';
import type { ConduitSubscriptionCallback, SubscriptionOptions } from '../types';
import { Events } from '../enums';
import type { SubscriptionTypes } from '../enums';

export class ConduitSubscription<T extends SubscriptionTypes> extends Subscription<T> {

  public readonly conduit: Conduit;

  public callbacks: ConduitSubscriptionCallbackManager<T>;

  public constructor(conduit: Conduit, options: SubscriptionOptions<T>, data: PostEventSubSubscription) {
    
    super(options, data);
    
    this.conduit = conduit;

    this.callbacks = new ConduitSubscriptionCallbackManager<T>(conduit);

    this.callbacks.add((message) => this.conduit.emit(Events.SubscriptionMessage, message, this));
    
  }

  public onMessage(callback: ConduitSubscriptionCallback<T>) {

    this.callbacks.add(callback);

  }

  public checkSubscriptionType<U extends T>(type: U): this is ConduitSubscription<U> {
    return this.type === type;
  }

  public async delete() {

    await this.conduit.helixClient.deleteEventSubSubscription(this.id);

    this.conduit.subscriptions.delete(this.id);

    await this.conduit.storage?.delete(this.id);

    return;
  }
}