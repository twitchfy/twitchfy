import type { connection } from 'websocket';
import { client } from 'websocket';
import type { WebSocketConduit } from './WebSocketConduit';
import { conduitMessageHandler } from '../util';

export class WebSocketConduitConnector extends client {

  public connection: WebSocketConduit;

  public sessionId: string | null;

  public wsConnection: connection | null;
  
  public connectionURL: string | null;
  
  public _oldConnection: WebSocketConduitConnector | null;
  
  public constructor(connection: WebSocketConduit){
  
    super();
  
    this.connection = connection;
  
    this.wsConnection = null;
  
    this.connectionURL = null;
  
    this._oldConnection = null;
  }
  
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