import { SubscriptionMessage } from '../../types/SubscriptionMessage';
import { WebhookConnection } from '../structures/WebhookConnection';
import { Subscription } from '../../structures/Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';

export interface WebsocketEventSubEvents {
    connectionReady: [connection: WebhookConnection],
    subscriptionCreate: [subscription: Subscription],
    subscriptionMessage: [message: SubscriptionMessage, subscription: Subscription<SubscriptionTypes, WebhookConnection>]
}