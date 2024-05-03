/**
 * Represents the session information sent in the welcome message.
 */
export interface WelcomeMessageSession {
    /**
     * The session ID.
     */
    id: string
    /**
     * The status of the connection.
     */
    status: 'connected'
    /**
     * The time the connection was established.
     */
    connected_at: string
    /**
     * The keepalive timeout.
     */
    keepalive_timeout_seconds: number
    /**
     * The reconnect URL. This is always null
     */
    reconnect_url: null
}