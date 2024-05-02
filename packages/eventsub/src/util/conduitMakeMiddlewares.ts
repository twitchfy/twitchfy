/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Express} from 'express';
import { urlencoded, json } from 'express';
import type { Body } from '../webhook';
import { verifySignature, parseRoute } from '../webhook';
import type { WebhookConduit } from '../structures';
export function conduitMakeMiddlewares(this: WebhookConduit, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.post(`${parseRoute(this.subscriptionRoute)}`, (req, res, next) => {

    if(!req.headers['twitch-eventsub-message-signature']) return res.sendStatus(401);

    const body = req.body as Body;

    if(req.headers['twitch-eventsub-message-type'] === 'webhook_callback_verification'){

      res.set('Content-Type', 'text/plain').status(200).send((body as Body<'webhook_callback_verification'>).challenge);
  
      return;
    }

    if(!verifySignature(req, this.secret)) return res.sendStatus(401);

    res.locals.webhookConnection = this;

    return next();

  });
}