import type { Express } from 'express';
import { WebSocketConnection, type WebSocketConnectionOptions } from '../ws';
import { type WebhookConnectionOptions, WebhookConnection } from '../webhook';

/**
 * The client used to create connections. You can create connections without this client.
 */
export class Client {

  /**
   * Builds up a new client.
   */
  public constructor(){}

  /**
   * Creates a new WebSocket connection.
   * @param options The options for building up the WebSocket connection.
   * @returns The WebSocket connection.
   */
  public createWebSocketConnection(options: WebSocketConnectionOptions){

    return new WebSocketConnection(options);

  }

  /**
   * Creates a new Webhook connection.
   * @param options The options for building up the Webhook connection.
   * @param server The express server to use for the Webhook connection.
   * @returns The Webhook connection.
   */
  public createWebhookConnection(options: WebhookConnectionOptions, server: Express){

    return new WebhookConnection(options, server);

  }

}