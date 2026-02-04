import { json, urlencoded, type Express } from 'express';
import type { WebhookConnection } from '../structures';

/**
 * Makes the middlewares for the webhook.
 * @param connection The connection to make the middlewares for.
 * @param server The express server to use.
 */
export function makeMiddlewares(connection: WebhookConnection, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.post(connection.subscriptionRoute, (_req, res, next) => {

    res.locals.webhookConnection = connection;

    return next();

  });
}
