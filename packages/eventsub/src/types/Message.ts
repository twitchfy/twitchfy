import type { BaseNotification } from '../interfaces';
import type { WelcomeMessage, ReconnectMessage } from '../ws';

/**
 * The message types that can be received by the WebSocket connection.
 */
export type Message = WelcomeMessage | BaseNotification | ReconnectMessage;