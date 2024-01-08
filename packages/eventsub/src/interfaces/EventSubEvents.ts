import { EventSubConnection } from '../structures/EventSubConnection';
import { Subscription } from '../structures/Subscription';

export interface EventSubEvents {
    connectionReady: [connection: EventSubConnection],
    subscriptionCreate: [subscription: Subscription]
}