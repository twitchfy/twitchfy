export interface SendChatMessageResponse {
    data: SendChatMessage[]
}

export interface SendChatMessage {
    message_id: string
    is_sent: boolean
    drop_reason: SendChatMessageDropReason | null
}

export interface SendChatMessageDropReason {
    code: string
    message: string
}