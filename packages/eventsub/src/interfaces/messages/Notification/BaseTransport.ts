/**
 * The base transport object for all transport types.
 */
export interface BaseTransport {
    method: 'websocket' | 'webhook' | 'conduit'
    session_id?: string
    callback?: string
    secret?: string
    conduit_id?: string
    connected_at?: string
    disconnected_at?: string
}