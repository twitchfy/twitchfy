import { Message as WSMessage } from 'websocket';
import { notificationHandler } from './notificationHandler';
import { Message } from '../types/Message';
import { EventSubWebsocket } from '../structures/EventSubWebsocket';
import { WelcomeMessage } from '../interfaces/messages/Welcome/WelcomeMessage';
import { BaseNotification } from '../interfaces/messages/Notification/BaseNotification';
import { Events } from '../enums/Events';

export function messageHandler(websocket: EventSubWebsocket, message: WSMessage) {

  if (message.type === 'utf8') {

    const parsedMessage = JSON.parse(message.utf8Data) as Message;

    switch (parsedMessage.metadata.message_type) {

    case 'session_welcome': {

      setMessageType<WelcomeMessage>(parsedMessage);

      websocket.connection.sessionID = parsedMessage.payload.session.id;

      websocket.connection.emit(Events.ConnectionReady, (websocket.connection));

    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      notificationHandler(websocket.connection, parsedMessage);
        
    }
    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }