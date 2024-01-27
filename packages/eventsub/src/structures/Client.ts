import { Express } from 'express';
import { EventSubConnection } from '../websocket/structures/EventSubConnection';
import { EventSubConnectionOptions } from '../websocket/interfaces/EventSubConnectionOptions';
import { WebhookConnectionOptions } from '../webhook/interfaces/WebhookConnectionOptions';
import { WebhookConnection } from '../webhook/structures/WebhookConnection';

export class Client {

  public constructor(){}

  public createWebsocketConnection(options: EventSubConnectionOptions){

    return new EventSubConnection(this, options);

  }

  public createWebhookConnection(options: WebhookConnectionOptions, server: Express){

    return new WebhookConnection(this, options, server);

  }

}