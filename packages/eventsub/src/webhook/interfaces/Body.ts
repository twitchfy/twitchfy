import type { BodySubscription } from './BodySubscription';
import type { BodyTypes } from '../types';

/**
 * The body sent by Twitch in a post to the subscription route.
 */
export interface Body<T extends BodyTypes = BodyTypes>{
    /**
     * The challenge sent by Twitch when verifying a callback.
     */
    challenge: T extends 'webhook_callback_verification' ? string : never
    /**
     * The subscription data sent in a notification body. 
     */
    subscription: T extends 'notification' ? BodySubscription : never;
    /**
     * The event data sent in a notification body.
     */
    event: T extends 'notification' ? object : never;
}