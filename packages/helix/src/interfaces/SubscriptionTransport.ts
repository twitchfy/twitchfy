export interface SubscriptionTransport {
    method: 'webhook' | 'websocket'
    callback?: string
    secret?: string
    session_id?: string
}