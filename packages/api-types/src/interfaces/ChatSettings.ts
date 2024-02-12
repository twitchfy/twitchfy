export interface GetChatSettingsResponse {
    data: ChatSettings[]
}

export interface ChatSettings {
    broadcaster_id: string
    emote_mode: boolean
    follower_mode: boolean
    follower_mode_duration: number | null
    moderator_id: string
    non_moderator_chat_delay: boolean
    non_moderator_chat_delay_duration: number | null
    slow_mode: boolean
    slow_mode_wait_time: number | null
    subscriber_mode: boolean
    unique_chat_mode: boolean
}


export interface PatchChatSettingsBody {
    emote_mode?: boolean
    follower_mode?: boolean
    follower_mode_duration?: number | null
    non_moderator_chat_delay?: boolean
    non_moderator_chat_delay_duration?: number
    slow_mode?: boolean
    slow_mode_wait_time?: number | null
    subscriber_mode?: boolean
    unique_chat_mode?: boolean
}