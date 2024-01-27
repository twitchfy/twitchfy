export interface BaseTransport {
    method: 'websocket' | 'webhook'
    session_id?: string
    callback?: string
    secret?: string
    connected_at?: string
    disconnected_at?: string
}