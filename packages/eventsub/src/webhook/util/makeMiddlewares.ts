import { Express, urlencoded, json } from 'express';
import { parseRoute } from './parseRoute';
import { verifySignature } from './verifySignature';
import { WebhookConnection } from '../structures/WebhookConnection';

export function makeMiddlewares(connection: WebhookConnection, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.use(`${parseRoute(connection.subscriptionRoute)}/:id`, (req, res, next) => {

    if(!req.headers['twitch-eventsub-message-signature']) return next();

    if(req.method !== 'POST') return next();

    const { id } = req.params;

    const body = req.body;

    const subscription = connection.subscriptions.get(id);

    if(!subscription) return next();

    if(!verifySignature(req, subscription.secret)) return res.sendStatus(401);

    if(req.headers['twitch-eventsub-message-type'] === 'webhook_callback_verification'){
      res.set('Content-Type', 'text/plain').status(200).send(body.challenge as { challenge: string });

      subscription.status = 'enabled';

      connection.subscriptions.set(subscription.id, subscription);
    }

    res.locals.webhookConnection = connection;

    return next();

  });
}