import type { WebhookConnectionOptions, WebSocketConnectionOptions } from '@twitchapi/eventsub';
import type { Express } from 'express';
import type { EventSubConnection } from '../enums';

/**
 * The options for the EventSub connection.
 */
export type EventSubOptions<T extends EventSubConnection> =  T extends EventSubConnection.WebSocket ?  Omit<WebSocketConnectionOptions, 'clientID' | 'clientSecret' | 'userToken'> : 
Omit<WebhookConnectionOptions, 'clientID' | 'clientSecret'> & { server: Express }