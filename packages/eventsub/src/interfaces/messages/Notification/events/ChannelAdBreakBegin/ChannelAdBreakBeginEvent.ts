export interface ChannelAdBreakBeginEvent {
    duration_seconds: string
    started_at: string
    is_automatic: boolean
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    requester_user_id: string
    requester_user_login: string
    requester_user_name: string
}