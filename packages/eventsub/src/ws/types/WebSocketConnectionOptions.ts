import type { UserTokenAdapter } from '@twitchfy/helix';
import type { BaseConnectionOptions } from '../../types';
import type { WebSocketConnection } from '../../ws';

/**
 * The options used to create a new WebSocketConnection.
 */
export type WebSocketConnectionOptions = BaseConnectionOptions<WebSocketConnection> & {
    /**
     * The user token used for the connection.
     */ 
    userToken: UserTokenAdapter<boolean>
    /**
     * The proxy url used for the connection.
     */
    proxy?: string
}