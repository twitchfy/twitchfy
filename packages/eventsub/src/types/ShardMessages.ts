import type { BasePayload } from '../interfaces';
import type { SubscriptionTypes } from '../enums';

export type ShardMessages = WebhookShardStart | SubscriptionNotification | WebSocketShardStart | Debug;

export interface WebhookShardStart {
    topic: 'shard.webhook.start',
    shard: {
        id: string
        status: string
        transport: {
            method: 'webhook'
            callback: string,
            secret: string
        }
    }
}

export interface WebSocketShardStart {
    topic: 'shard.websocket.start',
    shard: {
        id: string
        status: string
        transport: {
            method: 'websocket'
            session_id: string
        }
    }
}

export type SubscriptionNotification<T extends SubscriptionTypes = SubscriptionTypes> = {
    topic: T;
    payload: BasePayload<T>;
};

export interface Debug {
    topic: 'debug';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any[];
}