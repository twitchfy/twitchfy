export interface PostWarnChatUserResponse {
    data: Warning[]
}

export interface Warning {
    broadcaster_id: string
    user_id: string
    moderator_id: string
    reason: string
}