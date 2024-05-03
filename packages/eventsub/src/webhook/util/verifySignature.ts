import type { Request } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verifies the signature of the request secret to ensure a secure enviroment.
 * @param req The request to verify.
 * @param secret The secret to use for the verification.
 * @returns Whether the signature is valid.
 */
export function verifySignature(req: Request, secret: string){

  const message = req.headers['twitch-eventsub-message-id'] + req.headers['twitch-eventsub-message-timestamp'] + JSON.stringify(req.body);

  const hmac = 'sha256=' + createHmac('sha256', secret).update(message).digest('hex');

  return timingSafeEqual(Buffer.from(hmac), Buffer.from(req.headers['twitch-eventsub-message-signature']));

}
