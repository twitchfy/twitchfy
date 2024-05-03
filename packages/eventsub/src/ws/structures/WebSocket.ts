import type { connection } from 'websocket';
import { client } from 'websocket';
import type { WebSocketConnection } from './WebSocketConnection';
import { messageHandler } from '../util';

/**
 * The custom WebSocket client for the EventSub connection.
 */
export class WebSocket extends client {

  /**
   * The WebSocketConnection.
   */
  public readonly connection: WebSocketConnection;

  /**
   * The WebSocket connection.
   */
  public wsConnection: connection | null;

  /**
   * The connection URL.
   */
  public connectionURL: string | null;

  /**
   * The last connection that was established after it was replaced with the reconnect message.
   * @internal
   */
  public _oldConnection: WebSocket | null;

  /**
   * Builds up a WebSocket client.
   * @param connection The WebSocketConnection.
   */
  public constructor(connection: WebSocketConnection){

    super();

    this.connection = connection;

    this.wsConnection = null;

    this.connectionURL = null;

    this._oldConnection = null;
  }

  /**
   * Connects to the WebSocket server.
   * @param url The URL to connect to. If not specified it will use the default Twitch connection. The Promise will be resolved when Twitch sends the session_welcome message.
   */
  public override async connect(url?: string){

    await new Promise((resolve) => {
      this.connectionURL = url;

      super.connect(url ?? this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws');

      this.on('connect', (connection) => { 

        this.connection.makeDebug(`Connected to ${this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws'}.`);
    
        this.wsConnection = connection;

        if(this._oldConnection) this._oldConnection.wsConnection.close();

        const fn = messageHandler.bind({ connector: this, resolve });

        this.wsConnection.on('message', fn);
    
      });

    });

  }
}