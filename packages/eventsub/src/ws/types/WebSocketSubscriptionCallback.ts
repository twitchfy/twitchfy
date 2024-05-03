/* eslint-disable @typescript-eslint/no-explicit-any */

import type { WebSocketConnection } from '../structures';
import type { SubscriptionTypes } from '../../enums';
import type { SubscriptionMessages } from '../../interfaces';

/**
 * The callback for a WebSocketSubscription.
 */
export type WebSocketSubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages<WebSocketConnection>[T]) => any | Promise<any> 