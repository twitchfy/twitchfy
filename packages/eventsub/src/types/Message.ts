import { BaseNotification } from '../interfaces';
import { WelcomeMessage } from '../ws';

export type Message = WelcomeMessage | BaseNotification;