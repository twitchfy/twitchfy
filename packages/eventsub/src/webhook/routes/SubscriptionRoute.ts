import type { Request } from 'express';
import { Router } from 'express';
import type { BasePayload } from '../../interfaces';
import type { SubscriptionTypes } from '../../enums';
import { notificationHandler } from '../../util';
import type { WebhookConnection } from '../../webhook';


export const SubscriptionRouter = Router();

SubscriptionRouter.post('/', async(req: Request, res) => {

  const connection = res.locals.webhookConnection as WebhookConnection;

  const body = req.body;

  setBodyType(body);

  const subscription = connection.subscriptions.get(body.subscription.id);

  if(!subscription) return connection.makeDebug(`Incoming non-listed subscription ${body.subscription.id} (${req.headers['twitch-eventsub-message-type']}). If you are using an storage check it's functionality.`);

  switch(req.headers['twitch-eventsub-message-type']){

  case 'notification': {

    await notificationHandler(connection, body);

    return res.sendStatus(200);

    break;

  }
  
    break;

  case 'revocation': {

    connection.makeWarn(`Subscription was revoked (${body.subscription.id})`);

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