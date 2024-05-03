import type { connection } from 'websocket';
import { client } from 'websocket';
import type { WebSocketShard } from './WebSocketShard';
import { conduitMessageHandler } from '../util';

/**
 * A WebSocket Shard Connector for connecting to Twitch WebSocket EventSub service.
 */
export class WebSocketShardConnector extends client {

  /**
   * The WebSocket Shard to connect to.
   */
  public readonly connection: WebSocketShard;

  /**
   * The session id of the shard.
   */
  public readonly sessionId: string | null;

  /**
   * The WebSocket connection used.
   */
  public wsConnection: connection | null;
  
  /**
   * The connection URL of the WebSocket server used.
   */
  public connectionURL: string | null;
  
  /**
   * The last connection that was established after it was replaced with the reconnect message.
   * @internal
   */
  public _oldConnection: WebSocketShardConnector | null;
  
  /**
   * Builds up a WebSocketShardConnector.
   * @param connection The WebSocket Shard to connect to.
   */
  public constructor(connection: WebSocketShard){
  
    super();
  
    this.connection = connection;
  
    this.wsConnection = null;
  
    this.connectionURL = null;
  
    this._oldConnection = null;
  }
  
  /**
   * Connects to the WebSocket server.
   * @param url The URL to connect to. If not specified it will use the default Twitch connection.
   */
  public override async connect(url?: string){
  
    await new Promise((resolve) => {

      this.connectionURL = url;
  
      super.connect(url ?? this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws');
  
      this.on('connect', (connection) => { 
      
        this.wsConnection = connection;
  
        if(this._oldConnection) this._oldConnection.wsConnection.close();
  
        const fn = conduitMessageHandler.bind({ connector: this, resolve });
  
        this.wsConnection.on('message', fn);
      
      });

    });
  
  } 
}