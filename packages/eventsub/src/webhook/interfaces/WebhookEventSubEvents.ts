import type { SubscriptionMessage } from '../../types/';
import type { WebhookConnection } from '../structures';
import type { Subscription } from '../../structures';
import type { SubscriptionTypes } from '../../enums';

export interface WebsocketEventSubEvents {
    connectionReady: [connection: WebhookConnection],
    subscriptionCreate: [subscription: Subscription],
    subscriptionMessage: [message: SubscriptionMessage, subscription: Subscription<SubscriptionTypes, WebhookConnection>]
}