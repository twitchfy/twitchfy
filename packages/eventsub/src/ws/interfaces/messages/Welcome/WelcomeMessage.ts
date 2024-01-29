import { WelcomeMessageMetadata } from '.';
import { WelcomeMessagePayload } from '.';

export interface WelcomeMessage {
    metadata: WelcomeMessageMetadata
    payload: WelcomeMessagePayload
}