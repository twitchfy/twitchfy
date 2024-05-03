/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Message as WSMessage } from 'websocket';
import { startup } from './startup';
import { notificationHandler } from '../../util';
import type { Message } from '../../types';
import { WebSocket } from '../structures';
import type { ReconnectMessage} from '../interfaces';
import { type WelcomeMessage } from '../interfaces';
import type { BaseNotification } from '../../interfaces';
import { Events } from '../../enums';

/**
 * Handles a message received from the websocket server.
 * @param this The this object
 * @param message The message received from the websocket server.
 */
export async function messageHandler(this: { connector: WebSocket, resolve: () => any }, message: WSMessage) {

  if (message.type === 'utf8') {

    const parsedMessage = JSON.parse(message.utf8Data) as Message;

    switch (parsedMessage.metadata.message_type) {

    case 'session_welcome': {

      setMessageType<WelcomeMessage>(parsedMessage);

      this.connector.connection.sessionId = parsedMessage.payload.session.id;

      this.connector.connection.makeDebug(`Received session_welcome message and estabilished sessionId to ${parsedMessage.payload.session.id}`);

      if(!this.connector._oldConnection){

        const fn = startup.bind(this.connector.connection);
      
        await fn();

        this.connector.connection.emit(Events.ConnectionReady, (this.connector.connection));

      } else {

        this.connector.connection.makeDebug('Reconnected to another session. No need to start subscriptions again.');

        this.connector.connection.emit(Events.ConnectionReconnect, this.connector.connection, this.connector.connectionURL);
      }

      this.resolve();

    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      await notificationHandler(this.connector.connection, parsedMessage.payload);
        
    }

      break;

    case 'session_reconnect': {

      setMessageType<ReconnectMessage>(parsedMessage);

      this.connector.connection.makeDebug(`Received session_reconnect message. Reconnecting to new reconnect url (${parsedMessage.payload.session.reconnect_url}).`);

      const newConnection = new WebSocket(this.connector.connection);

      newConnection._oldConnection = this.connector; 

      this.connector.connection.ws = newConnection;

      newConnection.connect(parsedMessage.payload.session.reconnect_url);
    }

    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }