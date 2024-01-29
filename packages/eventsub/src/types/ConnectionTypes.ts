import { WebhookConnection } from '../webhook';
import { EventSubConnection } from '../ws';

export type ConnectionTypes = EventSubConnection | WebhookConnection;