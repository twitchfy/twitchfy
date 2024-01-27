export interface WelcomeMessageSession {
    id: string
    status: 'connected'
    connected_at: string
    keepalive_timeout_seconds: number
    reconnect_url: null
}