import type { ConduitOptions, WebhookConnectionOptions, WebSocketConnectionOptions } from '@twitchfy/eventsub';
import type { Express } from 'express';
import type { EventSubConnection } from '../enums';

/**
 * Omit the client Id and secret from the EventSub Options.
 */
type OmitClientProps<T> = T extends { clientId: string; clientSecret: string } ? Omit<T, 'clientId' | 'clientSecret' | 'userToken'> : T;

/**
 * The options for the EventSub connection.
 */
export type EventSubOptions<T extends EventSubConnection> =
  (T extends EventSubConnection.WebSocket ? OmitClientProps<WebSocketConnectionOptions> : T extends EventSubConnection.Webhook ?
    OmitClientProps<WebhookConnectionOptions> & { server?: Express } : OmitClientProps<ConduitOptions>);

