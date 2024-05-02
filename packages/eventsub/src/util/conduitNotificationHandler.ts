/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { SubscriptionTypes } from '../enums';
import type { BasePayload } from '../interfaces';
import type { WebhookConduit} from '../structures';
import { WebSocketConduit } from '../structures';

export async function conduitNotificationHandler(this: WebhookConduit | WebSocketConduit, payload: BasePayload<SubscriptionTypes>){

  this.makeDebug(`Received message (${payload.subscription.type}) with subscriptionId set to ${payload.subscription.id} in ${this instanceof WebSocketConduit ? 'WebSocket' : 'Webhook'} shard with id ${this.shardId}.`);

  this.sendPacket({ topic: payload.subscription.type, payload });
 
}

