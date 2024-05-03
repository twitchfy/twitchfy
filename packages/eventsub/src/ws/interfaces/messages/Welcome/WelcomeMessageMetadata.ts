/**
 * Metadata for a welcome message.
 */
export interface WelcomeMessageMetadata {
    /**
     * The message ID of the welcome message.
     */
    message_id: string
    /**
     * The type of the message. This is always 'session_welcome'.
     */
    message_type: 'session_welcome'
    /**
     * The timestamp of the message.
     */
    message_timestamp: string
}