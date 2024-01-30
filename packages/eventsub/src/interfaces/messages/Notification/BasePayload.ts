import type { BaseSubscription } from './BaseSubscription';
import type { SubscriptionEvents } from './events';
import type { SubscriptionTypes } from '../../../enums';

export interface BasePayload<T extends SubscriptionTypes = SubscriptionTypes> {
    subscription: BaseSubscription<T>
    event: SubscriptionEvents[T]
}