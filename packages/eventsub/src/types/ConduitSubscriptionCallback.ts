/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conduit } from '../structures';
import type { SubscriptionTypes } from '../enums';
import type { SubscriptionMessages } from '../interfaces';

/**
 * The callback for the conduit subscription.
 */
export type ConduitSubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages<Conduit>[T]) => any | Promise<any> 