import type { Message as WSMessage } from 'websocket';
import { notificationHandler } from '../../util';
import type { Message } from '../../types';
import type { EventSubWebsocket } from '../structures';
import type { WelcomeMessage } from '../interfaces';
import type { BaseNotification } from '../../interfaces';
import { Events } from '../../enums';

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

      notificationHandler(websocket.connection, parsedMessage.payload);
        
    }
    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }