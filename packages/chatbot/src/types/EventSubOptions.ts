import type { WebhookConnectionOptions, WebSocketConnectionOptions } from '@twitchapi/eventsub';
import type { Express } from 'express';
import type { EventSubConnection } from '../enums';

/**
 * Omit the client ID and secret from the EventSub Options.
 */
type OmitClientProps<T> = T extends { clientID: string; clientSecret: string } ? Omit<T, 'clientID' | 'clientSecret' | 'userToken'> : T;

/**
 * The options for the EventSub connection.
 */
export type EventSubOptions<T extends EventSubConnection> =
  (T extends EventSubConnection.WebSocket ? OmitClientProps<WebSocketConnectionOptions> :
    OmitClientProps<WebhookConnectionOptions> & { server: Express });

