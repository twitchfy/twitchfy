import type { ReconnectMessageMetadata } from './ReconnectMessageMetadata';
import type { ReconnectMessagePayload } from './ReconnectMessagePayload';

/**
 * Represents a reconnect message sent to the websocket client.
 */
export interface ReconnectMessage {
    /**
     * The metadata of the reconnect message.
     */
    metadata: ReconnectMessageMetadata
    /**
     * The payload of the reconnect message.
     */
    payload: ReconnectMessagePayload
}