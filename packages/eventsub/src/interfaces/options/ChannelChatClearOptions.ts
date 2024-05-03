/**
 * The options for subscribing to the ChannelChatClear event.
 */
export interface ChannelChatClearOptions {
    /**
     * The broadcaster user ID to listen to chat clear events for.
     */
    broadcaster_user_id: string
    /**
     * The user ID to read the chat as.
     */
    user_id: string
}