import type { WelcomeMessageMetadata } from './WelcomeMessageMetadata';
import type { WelcomeMessagePayload } from './WelcomeMessagePayload';

/**
 * The welcome message sent to the websocket client.
 */
export interface WelcomeMessage {
    /**
     * The metadata of the welcome message.
     */
    metadata: WelcomeMessageMetadata
    /**
     * The payload of the welcome message.
     */
    payload: WelcomeMessagePayload
}