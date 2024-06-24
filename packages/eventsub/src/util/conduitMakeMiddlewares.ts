/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Express, urlencoded as urlencodedType, json as jsonType } from 'express';
import type { WebhookShard } from '../structures';

let urlencoded : typeof urlencodedType | undefined = undefined;
let json : typeof jsonType| undefined = undefined;

try {
  urlencoded= require('express').urlencoded;
  json = require('express').json;
} catch {
  // Do nothing
}

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