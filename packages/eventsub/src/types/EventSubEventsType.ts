import type { ConnectionTypes } from './ConnectionTypes';
import type { EventSubEvents, WebSocketEvents, WebhookEvents } from '../interfaces';
import type { WebhookConnection } from '../webhook';
import type { WebSocketConnection } from '../ws';

export type EventSubEventsType<T extends ConnectionTypes> = T extends WebhookConnection ? WebhookEvents: T extends WebSocketConnection? WebSocketEvents : EventSubEvents 