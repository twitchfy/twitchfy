import type { WebhookConnection, WebSocketConnection } from '@twitchapi/eventsub';
import type { EventSubConnection } from '../enums';

/**
 * The connection map for EventSub connection based on {@link EventSubConnection}.
 * @internal
 */
export interface EventSubConnectionMap{
    [EventSubConnection.WebSocket]: WebSocketConnection
    [EventSubConnection.Webhook]: WebhookConnection
}