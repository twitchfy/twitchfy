/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Express} from 'express';
import { urlencoded, json } from 'express';
import { parseRoute } from './parseRoute';
import { verifySignature } from './verifySignature';
import type { WebhookConnection } from '../structures';
import type { Body } from '../interfaces';

/**
 * Makes the middlewares for the webhook.
 * @param connection The connection to make the middlewares for.
 * @param server The express server to use.
 */
export function makeMiddlewares(connection: WebhookConnection, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.post(`${parseRoute(connection.subscriptionRoute)}`, (req, res, next) => {

    if(!req.headers['twitch-eventsub-message-signature']) return res.sendStatus(401);

    const body = req.body as Body;

    const subscription = connection.subscriptions.get(body.subscription.id);

    if(!subscription) return res.sendStatus(401);

    if(!verifySignature(req, subscription.secret)) return res.sendStatus(401);

    if(req.headers['twitch-eventsub-message-type'] === 'webhook_callback_verification'){

      res.set('Content-Type', 'text/plain').status(200).send((body as Body<'webhook_callback_verification'>).challenge);

      subscription.status = 'enabled';

      connection.subscriptions.set(subscription.id, subscription);

      return;
    }

    res.locals.webhookConnection = connection;

    return next();

  });
}