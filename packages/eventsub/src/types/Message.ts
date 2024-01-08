import { BaseNotification } from '../interfaces/messages/Notification/BaseNotification';
import { WelcomeMessage } from '../interfaces/messages/Welcome/WelcomeMessage';

export type Message = WelcomeMessage | BaseNotification;