/**
 * Metadata for a reconnect message.
 */
export interface ReconnectMessageMetadata {
    /**
     * The message ID of the reconnect message.
     */
    message_id: string
    /**
     * The type of the message. This is always 'session_reconnect'.
     */
    message_type: 'session_reconnect'
    /**
     * The timestamp of the message.
     */
    message_timestamp: string
}