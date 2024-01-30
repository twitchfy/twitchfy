import type { WelcomeMessageMetadata } from './WelcomeMessageMetadata';
import type { WelcomeMessagePayload } from './WelcomeMessagePayload';

export interface WelcomeMessage {
    metadata: WelcomeMessageMetadata
    payload: WelcomeMessagePayload
}