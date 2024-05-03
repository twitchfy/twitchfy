import type { EventSubEvents } from './EventSubEvents';
import type { WebhookConnection } from '../webhook';


/**
 * The specific event emitted for the Webhook connection.
 */
export interface WebhookEvents extends EventSubEvents<WebhookConnection> {}