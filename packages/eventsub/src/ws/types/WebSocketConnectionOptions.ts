import type { UserTokenAdapter } from '@twitchfy/helix';
import type { BaseConnectionOptions } from '../../types';
import type { WebSocketConnection } from '../../ws';

export type WebSocketConnectionOptions = BaseConnectionOptions<WebSocketConnection> & { 
    userToken: UserTokenAdapter<boolean>
    proxy?: string
}