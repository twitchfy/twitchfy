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

      this.connection.sessionId = parsedMessage.payload.session.id;

      this.connection.makeDebug(`Received session_welcome message and estabilished sessionId to ${parsedMessage.payload.session.id}`);

      if(!this._oldConnection){

        const fn = startup.bind(this.connection);
      
        await fn();

        this.connection.emit(Events.ConnectionReady, (this.connection));

      } else {

        this.connection.makeDebug('Reconnected to another session. No need to start subscriptions again.');

        this.connection.emit(Events.ConnectionReconnect, this.connection, this.connectionURL);
      }

    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      await notificationHandler(this.connection, parsedMessage.payload);
        
    }

      break;

    case 'session_reconnect': {

      setMessageType<ReconnectMessage>(parsedMessage);

      this.connection.makeDebug(`Received session_reconnect message. Reconnecting to new reconnect url (${parsedMessage.payload.session.reconnect_url}).`);

      const newConnection = new WebSocket(this.connection);

      newConnection._oldConnection = this; 

      this.connection.ws = newConnection;

      newConnection.connect(parsedMessage.payload.session.reconnect_url);
    }

    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }