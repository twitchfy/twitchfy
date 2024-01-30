import type { Request } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifySignature(req: Request, secret: string){

  const message = req.headers['twitch-eventsub-message-id'] + req.headers['twitch-eventsub-message-timestamp'] + JSON.stringify(req.body);

  const hmac = 'sha256=' + createHmac('sha256', secret).update(message).digest('hex');

  return timingSafeEqual(Buffer.from(hmac), Buffer.from(req.headers['twitch-eventsub-message-signature']));

}
