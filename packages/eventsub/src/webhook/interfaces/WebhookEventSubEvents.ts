import { SubscriptionMessage } from '../../types/';
import { WebhookConnection } from '../structures';
import { Subscription } from '../../structures';
import { SubscriptionTypes } from '../../enums';

export interface WebsocketEventSubEvents {
    connectionReady: [connection: WebhookConnection],
    subscriptionCreate: [subscription: Subscription],
    subscriptionMessage: [message: SubscriptionMessage, subscription: Subscription<SubscriptionTypes, WebhookConnection>]
}