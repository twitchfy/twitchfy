/* eslint-disable @typescript-eslint/ban-types */

import type { SubscriptionTypes } from '../enums';
import type { SubscriptionMessage, ConnectionTypes, SubscriptionType } from '../types';

export interface EventSubEvents<K extends ConnectionTypes = ConnectionTypes> {
    connectionReady: [connection: K]
    subscriptionCreate: [subscription: SubscriptionType<SubscriptionTypes, K>]
    subscriptionMessage: [message: SubscriptionMessage<K>, subscription: SubscriptionType<SubscriptionTypes, K>]
    subscriptionReload: [subscription: SubscriptionType<SubscriptionTypes, K>]
}