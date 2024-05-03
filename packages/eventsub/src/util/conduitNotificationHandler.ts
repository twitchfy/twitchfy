/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { SubscriptionTypes } from '../enums';
import type { BasePayload } from '../interfaces';
import type { WebhookShard} from '../structures';
import { WebSocketShard } from '../structures';

/**
 * Handles a subscription notification from the conduit.
 *
 * @param payload The payload of the notification.
 */
export async function conduitNotificationHandler(this: WebhookShard | WebSocketShard, payload: BasePayload<SubscriptionTypes>){

  this.makeDebug(`Received message (${payload.subscription.type}) with subscriptionId set to ${payload.subscription.id} in ${this instanceof WebSocketShard ? 'WebSocket' : 'Webhook'} shard with id ${this.shardId}.`);

  this.sendPacket({ topic: payload.subscription.type, payload });
 
}

