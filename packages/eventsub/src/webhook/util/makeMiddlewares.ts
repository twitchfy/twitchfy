/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Express, urlencoded as urlencodedType, json as jsonType } from 'express';
import type { WebhookConnection } from '../structures';

let urlencoded : typeof urlencodedType | undefined = undefined;
let json : typeof jsonType| undefined = undefined;

try {
  urlencoded= require('express').urlencoded;
  json = require('express').json;
} catch {
  // Do nothing
}

/**
 * Makes the middlewares for the webhook.
 * @param connection The connection to make the middlewares for.
 * @param server The express server to use.
 */
export function makeMiddlewares(connection: WebhookConnection, server: Express){
  
  server.use(urlencoded({ extended: true }));
  server.use(json());


  server.post(connection.subscriptionRoute, (_req, res, next) => {

    res.locals.webhookConnection = connection;

    return next();

  });
}