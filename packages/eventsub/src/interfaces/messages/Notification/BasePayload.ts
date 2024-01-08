import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { SubscriptionEvents } from './events/SubscriptionEvents';
import { BaseSubscription } from './BaseSubscription';

export interface BasePayload<T extends SubscriptionTypes> {
    subscription: BaseSubscription<T>
    event: SubscriptionEvents[T]
}