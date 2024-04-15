import type { ReconnectMessageMetadata } from './ReconnectMessageMetadata';
import type { ReconnectMessagePayload } from './ReconnectMessagePayload';

export interface ReconnectMessage {
    metadata: ReconnectMessageMetadata
    payload: ReconnectMessagePayload
}