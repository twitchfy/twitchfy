import type { Request , IRouter } from 'express';
import { Router } from 'express';
import { conduitNotificationHandler } from './conduitNotificationHandler';
import type { BasePayload } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import type { WebhookConduit } from '../structures';


export const ConduitSubscriptionRouter: IRouter = Router();

ConduitSubscriptionRouter.post('/', async(req: Request, res) => {

  const connection = res.locals.webhookConnection as WebhookConduit;

  const body = req.body;

  setBodyType(body);

  switch(req.headers['twitch-eventsub-message-type']){

  case 'notification': {

    const fn = conduitNotificationHandler.bind(connection);

    await fn(body);

    return res.sendStatus(200);

    break;

  }
  
    break;

  case 'revocation': {

    connection.makeDebug(`Subscription was revoked (${body.subscription.id})`);

  }

    break;


  case 'webhook_callback_verification': {

    connection.makeDebug(`Get webhook callback verification for ${body.subscription.id}`);

  }

    break;

  }

  return res.sendStatus(200);

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

function setBodyType<T extends SubscriptionTypes>(body: Request['body']): asserts body is BasePayload<T> {}