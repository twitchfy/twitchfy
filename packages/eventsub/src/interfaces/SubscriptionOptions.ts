import { SubscriptionTypeOptions } from '.';
import { SubscriptionTypes } from '../enums';

export interface SubscriptionOptions<T extends SubscriptionTypes = SubscriptionTypes> {
    type: T
    options: SubscriptionTypeOptions[T]
    nonce?: string
    auth?: string
}