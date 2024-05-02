import type { Conduit, WebhookConnection, WebSocketConnection } from '@twitchfy/eventsub';
import type { EventSubConnection } from '../enums';

/**
 * The connection map for EventSub connection based on {@link EventSubConnection}.
 * @internal
 */
export interface EventSubConnectionMap{
    [EventSubConnection.WebSocket]: WebSocketConnection
    [EventSubConnection.Webhook]: WebhookConnection
    [EventSubConnection.Conduit]: Conduit
}