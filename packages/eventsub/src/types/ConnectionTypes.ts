import type { Conduit } from '../structures';
import type { WebhookConnection } from '../webhook';
import type { WebSocketConnection } from '../ws';

export type ConnectionTypes = WebSocketConnection | WebhookConnection | Conduit;