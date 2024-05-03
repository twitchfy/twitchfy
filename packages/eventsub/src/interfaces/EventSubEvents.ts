/* eslint-disable @typescript-eslint/ban-types */

import type { SubscriptionTypes } from '../enums';
import type { SubscriptionMessage, ConnectionTypes, SubscriptionType } from '../types';

/**
 * The events that can be emitted by any specific EventSub connection.
 */
export interface EventSubEvents<K extends ConnectionTypes = ConnectionTypes> {
    /**
     * Emitted when the EventSub connection is ready and fully integrated within Twitch.
     */
    connectionReady: [connection: K]
    /**
     * Emitted when a subscription is created in the first time.
     */
    subscriptionCreate: [subscription: SubscriptionType<SubscriptionTypes, K>]
    /**
     * Emitted when a message from a subscription is received.
     */
    subscriptionMessage: [message: SubscriptionMessage<K>, subscription: SubscriptionType<SubscriptionTypes, K>]
    /**
     * Emitted when a subscription is reloaded from the storage.
     */
    subscriptionReload: [subscription: SubscriptionType<SubscriptionTypes, K>]
}