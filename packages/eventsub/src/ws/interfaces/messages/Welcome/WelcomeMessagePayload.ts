import type { WelcomeMessageSession } from './WelcomeMessageSession';

/**
 * The payload of the welcome message.
 */
export interface WelcomeMessagePayload {
    /**
     * The session information.
     */
    session: WelcomeMessageSession
}