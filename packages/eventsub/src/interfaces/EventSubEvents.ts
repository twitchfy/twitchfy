import type { SubscriptionMessage, ConnectionTypes } from '../types';
import type { Subscription } from '../structures';
import type { SubscriptionTypes } from '../enums';

export interface EventSubEvents<K extends ConnectionTypes = ConnectionTypes> {
    connectionReady: (...args: [connection: K]) => void,
    subscriptionCreate: (...args: [subscription: Subscription<SubscriptionTypes, K>]) => void,
    subscriptionMessage: (...args: [message: SubscriptionMessage, subscription: Subscription<SubscriptionTypes, K>]) => void
}