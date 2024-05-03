import type { ReconnectMessageSession } from './ReconnectMessageSession';

/**
 * The payload of a reconnect message.
 */
export interface ReconnectMessagePayload {
    /**
     * The session data.
     */
    session: ReconnectMessageSession
}