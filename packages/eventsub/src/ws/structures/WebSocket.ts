import type { connection } from 'websocket';
import { client } from 'websocket';
import type { WebSocketConnection } from './WebSocketConnection';
import { messageHandler } from '../util';

export class WebSocket extends client {

  public connection: WebSocketConnection;

  public wsConnection: connection | null;

  public constructor(connection: WebSocketConnection){

    super();

    this.connection = connection;

    this.wsConnection = null;


  }

  public override connect(){

    super.connect(this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws');

    this.on('connect', (connection) => { 

      this.connection.makeDebug(`Connected to ${this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws'}.`);
    
      this.wsConnection = connection;

      this.wsConnection.on('message', async(message) => await messageHandler(this, message));
    
    });

  }
}