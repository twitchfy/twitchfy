import { createHmac, timingSafeEqual } from 'node:crypto';
import type { IncomingHttpHeaders } from 'node:http';

/**
 * Verifies the signature of the request secret to ensure a secure enviroment.
 * @param headers The headers sent by Twitch.
 * @param body The body of the request.
 * @param secret The secret to use for the verification.
 * @returns Whether the signature is valid.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifySignature(headers: IncomingHttpHeaders, body: any, secret: string){

  const message = headers['twitch-eventsub-message-id'] + headers['twitch-eventsub-message-timestamp'] + JSON.stringify(body);

  const hmac = 'sha256=' + createHmac('sha256', secret).update(message).digest('hex');

  return timingSafeEqual(Buffer.from(hmac), Buffer.from(headers['twitch-eventsub-message-signature']));

}
