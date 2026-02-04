import { Router, type Request, type IRouter } from 'express';
import type { WebhookShard } from '../structures';

/**
 * The router for the conduit subscription route.
 */
export const ConduitSubscriptionRouter: IRouter = Router();

ConduitSubscriptionRouter.post('/', async(req: Request, res) => {

  const connection = res.locals.webhookConnection as WebhookShard;

  await connection.post(req.headers, req.body, async(challenge) => {
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
