import { client, connection } from 'websocket';
import { EventSubConnection } from './EventSubConnection';
import { messageHandler } from '../util/messageHandler';

export class EventSubWebsocket extends client {

  public connection: EventSubConnection;

  public wsConnection: connection | null;

  public constructor(connection: EventSubConnection){

    super();

    this.connection = connection;

    this.wsConnection = null;


  }

  public override connect(){

    super.connect(this.connection.proxy ?? 'wss://eventsub.wss.twitch.tv/ws');

    this.on('connect', (connection) => { 
    
      this.wsConnection = connection;

      this.wsConnection.on('message', (message) => messageHandler(this, message));
    
    });

  }
}