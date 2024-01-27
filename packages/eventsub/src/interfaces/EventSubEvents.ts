import { SubscriptionMessage } from '../types/SubscriptionMessage';
import { ConnectionTypes } from '../types/ConnectionTypes';
import { Subscription } from '../structures/Subscription';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export interface EventSubEvents<K extends ConnectionTypes = ConnectionTypes> {
    connectionReady: (...args: [connection: K]) => void,
    subscriptionCreate: (...args: [subscription: Subscription<SubscriptionTypes, K>]) => void,
    subscriptionMessage: (...args: [message: SubscriptionMessage, subscription: Subscription<SubscriptionTypes, K>]) => void
}