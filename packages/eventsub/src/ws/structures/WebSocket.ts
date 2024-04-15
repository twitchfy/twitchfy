import type { connection } from 'websocket';
import { client } from 'websocket';
import type { WebSocketConnection } from './WebSocketConnection';
import { messageHandler } from '../util';

export class WebSocket extends client {

  public connection: WebSocketConnection;

  public wsConnection: connection | null;

  protected _oldConnection: WebSocket | null;

  public constructor(connection: WebSocketConnection){

    super();

    this.connection = connection;

    this.wsConnection = null;

    this._oldConnection = null;
  }

  public override connect(url?: string){

    super.connect(url ?? this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws');

    this.on('connect', (connection) => { 

      this.connection.makeDebug(`Connected to ${this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws'}.`);
    
      this.wsConnection = connection;

      if(this._oldConnection) this._oldConnection.wsConnection.close();

      const fn = messageHandler.bind(this);

      this.wsConnection.on('message', fn);
    
    });

  }
}