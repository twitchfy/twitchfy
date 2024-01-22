import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { SubscriptionTypeOptions } from './SubscriptionTypeOptions';

export interface SubscriptionOptions<T extends SubscriptionTypes = SubscriptionTypes> {
    type: T
    options: SubscriptionTypeOptions[T]
    nonce?: string
    auth?: string
}