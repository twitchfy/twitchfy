import type { BaseSubscription } from './BaseSubscription';
import type { SubscriptionEvents } from './events';
import type { SubscriptionTypes } from '../../../enums';

/**
 * The base payload for all notification messages.
 */
export interface BasePayload<T extends SubscriptionTypes = SubscriptionTypes> {
    subscription: BaseSubscription<T>
    event: SubscriptionEvents[T]
}