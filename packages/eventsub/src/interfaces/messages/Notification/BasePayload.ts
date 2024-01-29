import { BaseSubscription, SubscriptionEvents } from '.';
import { SubscriptionTypes } from '../../../enums';

export interface BasePayload<T extends SubscriptionTypes = SubscriptionTypes> {
    subscription: BaseSubscription<T>
    event: SubscriptionEvents[T]
}