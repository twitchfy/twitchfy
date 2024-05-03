/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ConnectionTypes } from './ConnectionTypes';
import type { SubscriptionMessages } from '../interfaces';
import type { SubscriptionTypes } from '../enums';

/**
 * The callback for a subscription.
 */
export type SubscriptionCallback<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> = (message: SubscriptionMessages<K>[T]) => any | Promise<any> 