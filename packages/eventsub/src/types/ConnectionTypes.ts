import type { WebhookConnection } from '../webhook';
import type { EventSubConnection } from '../ws';

export type ConnectionTypes = EventSubConnection | WebhookConnection;