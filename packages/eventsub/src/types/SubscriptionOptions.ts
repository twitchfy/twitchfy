/* eslint-disable @typescript-eslint/ban-types */

import type { SubscriptionTypeOptions } from '../interfaces';
import type { SubscriptionTypes } from '../enums';

/**
 * The options for creating a subscription.
 */
export type SubscriptionOptions<T extends SubscriptionTypes = SubscriptionTypes> = {
    type: T
    options: SubscriptionTypeOptions[T]
    nonce?: string
}