import type { EventSubEvents } from './EventSubEvents';
import type { WebhookConnection } from '../webhook';


export interface WebhookEvents extends EventSubEvents<WebhookConnection> {}