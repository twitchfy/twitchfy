
export interface PostSendChatMessageBody {
  broadcaster_id: string;
  sender_id: string;
  message: string;
  reply_parent_message_id: string;
  
}

export interface PostSendChatMessageResponse {
    data: PostSendChatMessage[]
}

export interface PostSendChatMessage {
    message_id: string
    is_sent: boolean
    drop_reason: PostSendChatMessageDropReason | null
}

export interface PostSendChatMessageDropReason {
    code: string
    message: string
}