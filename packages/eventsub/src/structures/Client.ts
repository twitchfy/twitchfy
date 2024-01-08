import { EventSubConnection } from './EventSubConnection';
import { EventSubConnectionOptions } from '../interfaces/EventSubConnectionOptions';

export class Client {

  public constructor(){}

  public createConnection(options: EventSubConnectionOptions){

    return new EventSubConnection(this, options);

  }

}