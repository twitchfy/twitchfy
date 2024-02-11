export interface SendMessage {
    message_id: string
    is_sent: boolean
    drop_reason: DropReasonSendMessage | null
}

export interface DropReasonSendMessage {
    code: string
    message: string
}