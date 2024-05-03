import type { BasePayload } from '../interfaces';
import type { SubscriptionTypes } from '../enums';

/**
 * The message types that can be received by the parent process from a shard.
 */
export type ShardMessages = WebhookShardStart | SubscriptionNotification | WebSocketShardStart | Debug;

/**
 * Message emitted when a shard is starting with a webhook transport.
 */
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

/**
 * Message emitted when a shard is starting with a websocket transport.
 */
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

/**
 * Message emitted when a shard has received a subscription notification.
 */
export type SubscriptionNotification<T extends SubscriptionTypes = SubscriptionTypes> = {
    topic: T;
    payload: BasePayload<T>;
};

/**
 * Message emitted when the shard needs to make a debug within the parent process.
 */
export interface Debug {
    topic: 'debug';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any[];
}