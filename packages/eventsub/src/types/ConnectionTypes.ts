import type { Conduit } from '../structures';
import type { WebhookConnection } from '../webhook';
import type { WebSocketConnection } from '../ws';

/**
 * The types of connections that can be used.
 */
export type ConnectionTypes = WebSocketConnection | WebhookConnection | Conduit;