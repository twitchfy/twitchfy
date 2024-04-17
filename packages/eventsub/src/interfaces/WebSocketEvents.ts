import type { EventSubEvents } from './EventSubEvents';
import type { WebSocketConnection } from '../ws';

export interface WebSocketEvents extends EventSubEvents<WebSocketConnection> { 
    reconnect: [connection: WebSocketConnection, reconnect_url: string]
}