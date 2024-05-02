import { type Message as WSMessage } from 'websocket';
import { conduitNotificationHandler } from './conduitNotificationHandler';
import { WebSocketConduitConnector } from '../structures';
import type { ReconnectMessage } from '../ws';
import { type WelcomeMessage } from '../ws';
import type { BaseNotification } from '../interfaces';
import type { Message } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function conduitMessageHandler(this: { connector: WebSocketConduitConnector, resolve: () => any }, message: WSMessage) {

  if (message.type === 'utf8') {

    const parsedMessage = JSON.parse(message.utf8Data) as Message;

    switch (parsedMessage.metadata.message_type) {

    case 'session_welcome': {

      setMessageType<WelcomeMessage>(parsedMessage);

      this.connector.connection.sessionId = parsedMessage.payload.session.id;

      this.connector.connection.makeDebug(`Received session_welcome message and estabilished sessionId to ${parsedMessage.payload.session.id}`);

      this.resolve();
    }

      break;

    case 'notification': {
        
      setMessageType<BaseNotification>(parsedMessage);

      const fn = conduitNotificationHandler.bind(this.connector.connection);

      await fn(parsedMessage.payload);
        
    }

      break;

    case 'session_reconnect': {

      setMessageType<ReconnectMessage>(parsedMessage);

      this.connector.connection.makeDebug(`Received session_reconnect message. Reconnecting to new reconnect url (${parsedMessage.payload.session.reconnect_url}).`);

      const newConnection = new WebSocketConduitConnector(this.connector.connection);

      newConnection._oldConnection = this.connector; 

      this.connector.connection.ws = newConnection;

      newConnection.connect(parsedMessage.payload.session.reconnect_url);
    }

    }

  }
}

function setMessageType<T extends Message>(message: Message): asserts message is T { }