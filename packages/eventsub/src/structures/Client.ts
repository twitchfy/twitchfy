import { Express } from 'express';
import { EventSubConnection, EventSubConnectionOptions } from '../ws';
import { WebhookConnectionOptions, WebhookConnection } from '../webhook';

export class Client {

  public constructor(){}

  public createWebsocketConnection(options: EventSubConnectionOptions){

    return new EventSubConnection(this, options);

  }

  public createWebhookConnection(options: WebhookConnectionOptions, server: Express){

    return new WebhookConnection(this, options, server);

  }

}