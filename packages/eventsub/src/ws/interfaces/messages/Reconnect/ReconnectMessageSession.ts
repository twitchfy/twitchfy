/**
 * Reconnect message payload session sent by the server.
 */
export interface ReconnectMessageSession {
    /**
     * The session ID.
     */
    id: string,
    /**
     * The session status.
     */
    status: string,
    /**
     * The session keepalive timeout in seconds.
     */
    keepalive_timeout_seconds: null,
    /**
     * The session reconnect URL to reconnect with.
     */
    reconnect_url: string,
    /**
     * The session connected at timestamp.
     */
    connected_at: string
}