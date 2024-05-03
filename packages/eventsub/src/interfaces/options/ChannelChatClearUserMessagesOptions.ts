/**
 * Options for subscribing to the ChannelChatClearUserMessages event.
 */
export interface ChannelChatClearUserMessagesOptions {
    /**
     * The broadcaster user ID to listen to chat clear user events for.
     */
    broadcaster_user_id: string
    /**
     * The user ID to read the chat as.
     */
    user_id: string
}