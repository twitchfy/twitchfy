/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Express} from 'express';
import { urlencoded, json } from 'express';
import type { WebhookShard } from '../structures';

/**
 * Makes the middlewares for the webhook server.
 *
 * @param server The server to make the middlewares for.
 */
export function conduitMakeMiddlewares(this: WebhookShard, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.post(this.subscriptionRoute, (_req, res, next) => {

    res.locals.webhookConnection = this;

    return next();

  });
}