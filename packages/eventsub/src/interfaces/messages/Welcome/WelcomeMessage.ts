import { WelcomeMessageMetadata } from './WelcomeMessageMetadata';
import { WelcomeMessagePayload } from './WelcomeMessagePayload';

export interface WelcomeMessage {
    metadata: WelcomeMessageMetadata
    payload: WelcomeMessagePayload
}