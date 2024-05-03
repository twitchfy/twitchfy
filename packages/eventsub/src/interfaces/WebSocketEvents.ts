import type { EventSubEvents } from './EventSubEvents';
import type { WebSocketConnection } from '../ws';

/**
 * The specific events emitted for the WebSocket connection.
 */
export interface WebSocketEvents extends EventSubEvents<WebSocketConnection> { 
    /**
     * Emitted when the WebSocket connection has reconnected to another url provided by the reconnect message sent by Twitch.
     */
    reconnect: [connection: WebSocketConnection, reconnect_url: string]
}