/* eslint-disable @typescript-eslint/ban-types*/

import type { UserTokenAdapter } from '@twitchapi/helix';
import type { WebSocketConnection, WebhookConnectionOptions } from '@twitchapi/eventsub';
import type { Express } from 'express';
import type { EventSubConnection } from '../interfaces/EventSubConnection';
import type { ConnectionType } from '../enums/ConnectionType';
import type { PickPartial } from '../types/PickPartial';

/**
 * The options for building the {@link ChatBot}.
 * @interface
 */
export interface ChatBotOptions<T extends ConnectionType>{
    clientID: string
    clientSecret: string
    connectionType: T
    auth: UserTokenAdapter<boolean>
    nick: string
    connection?: EventSubConnection[T];
    connectionOptions: T extends ConnectionType.Webhook? PickPartial<WebhookConnectionOptions, 'baseURL' | 'appToken' | 'secret'> & { server: Express } : Partial<WebSocketConnection>
    channels?: string[]
    noticeLog?: boolean
}

