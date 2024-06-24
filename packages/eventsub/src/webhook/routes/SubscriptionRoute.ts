import type { Request , IRouter, Router as RouterType } from 'express';
import type { WebhookConnection } from '../../webhook';

let Router: typeof RouterType | undefined = undefined;

try {
  Router = require('express').Router;
} catch {
  // Do nothing
}

/**
 * The router for the subscription route.
 */
export const SubscriptionRouter: IRouter | undefined = Router? Router() : undefined;

SubscriptionRouter?.post('/', async(req: Request, res) => {

  const connection = res.locals.webhookConnection as WebhookConnection;

  await connection.post(req.headers, req.body, (challenge) => {
    return res.set('Content-Type', 'text/plain').status(200).send(challenge);
  }, () => {
    return res.sendStatus(200);
  });

});


declare module 'http' {
    interface IncomingHttpHeaders {
        'twitch-eventsub-message-type': 'notification' | 'webhook_callback_verification' | 'revocation'
        'twitch-eventsub-message-id': string
        'twitch-eventsub-message-retry': string
        'twitch-eventsub-message-signature': string
        'twitch-eventsub-message-timestamp': string
        'twitch-eventsub-subscription-type': string
        'twitch-eventsub-subscription-version': string
    }
}