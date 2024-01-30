import type { SubscriptionTypeOptions } from './SubscriptionTypeOptions';
import type { SubscriptionTypes } from '../enums';

export interface SubscriptionOptions<T extends SubscriptionTypes = SubscriptionTypes> {
    type: T
    options: SubscriptionTypeOptions[T]
    nonce?: string
    auth?: string
}