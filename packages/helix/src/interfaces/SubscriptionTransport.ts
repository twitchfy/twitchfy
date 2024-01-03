export interface SubscriptionTransport {
    method: 'webhooks' | 'websocket'
    callback?: string
    secret?: string
    session_id?: string
}