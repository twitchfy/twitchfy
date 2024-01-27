import { Router, Request } from 'express';
import { BasePayload } from '../../interfaces/messages/Notification/BasePayload';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { notificationHandler } from '../../util/notificationHandler';


const router = Router();

router.post('/:id', (req: Request, res) => {

  const connection = res.locals.webhookConnection;

  const body = req.body;
  
  if(req.headers['twitch-eventsub-message-type'] === 'notification'){

    setBodyType(body);

    notificationHandler(connection, body);

    return res.sendStatus(200);
  }

  return res.sendStatus(200);

});

export default router;

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