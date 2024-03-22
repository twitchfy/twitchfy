import type { Message as WSMessage } from 'websocket';
import { startup } from './startup';
import { notificationHandler } from '../../util';
import type { Message } from '../../types';
import type { WebSocket } from '../structures';
import type { WelcomeMessage } from '../interfaces';
import type { BaseNotification } from '../../interfaces';
import { Events } from '../../enums';

export async function messageHandler(websocket: WebSocket, message: WSMessage) {

  if (message.type === 'utf8') {

    const parsedMessage = JSON.parse(message.utf8Data) as Message;

    switch (parsedMessage.metadata.message_type) {

    case 'session_welcome': {

      setMessageType<WelcomeMessage>(parsedMessage);

      websocket.connection.sessionID = parsedMessage.payload.session.id;

      websocket.connection.makeDebug(`Received session_welcome message and estabilished sessionId to ${parsedMessage.payload.session.id}`);

      await startup(websocket.connection);

      websocket.connection.emit(Events.ConnectionReady, (websocket.connection));

    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      notificationHandler(websocket.connection, parsedMessage.payload);
        
    }
    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }