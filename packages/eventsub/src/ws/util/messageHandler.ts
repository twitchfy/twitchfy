import { type Message as WSMessage } from 'websocket';
import { startup } from './startup';
import { notificationHandler } from '../../util';
import type { Message } from '../../types';
import { WebSocket } from '../structures';
import type { ReconnectMessage} from '../interfaces';
import { type WelcomeMessage } from '../interfaces';
import type { BaseNotification } from '../../interfaces';
import { Events } from '../../enums';

export async function messageHandler(this: WebSocket, message: WSMessage) {

  if (message.type === 'utf8') {

    const parsedMessage = JSON.parse(message.utf8Data) as Message;

    switch (parsedMessage.metadata.message_type) {

    case 'session_welcome': {

      setMessageType<WelcomeMessage>(parsedMessage);

      this.connection.sessionID = parsedMessage.payload.session.id;

      this.connection.makeDebug(`Received session_welcome message and estabilished sessionId to ${parsedMessage.payload.session.id}`);

      const fn = startup.bind(this.connection);
      
      await fn();

      this.connection.emit(Events.ConnectionReady, (this.connection));

    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      await notificationHandler(this.connection, parsedMessage.payload);
        
    }

      break;

    case 'session_reconnect': {

      setMessageType<ReconnectMessage>(parsedMessage);

      const newConnection = new WebSocket(this.connection);

      newConnection._oldConnection = this; 

      this.connection.ws = newConnection;

      newConnection.connect(parsedMessage.payload.session.reconnect_url);
    }

    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }