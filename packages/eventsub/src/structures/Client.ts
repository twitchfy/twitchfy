import type { Express } from 'express';
import { WebSocketConnection, type WebSocketConnectionOptions } from '../ws';
import { type WebhookConnectionOptions, WebhookConnection } from '../webhook';

export class Client {

  public constructor(){}

  public createWebSocketConnection(options: WebSocketConnectionOptions){

    return new WebSocketConnection(options);

  }

  public createWebhookConnection(options: WebhookConnectionOptions, server: Express){

    return new WebhookConnection(options, server);

  }

}