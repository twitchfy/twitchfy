import type { BaseNotification } from '../interfaces';
import type { WelcomeMessage, ReconnectMessage } from '../ws';

export type Message = WelcomeMessage | BaseNotification | ReconnectMessage;