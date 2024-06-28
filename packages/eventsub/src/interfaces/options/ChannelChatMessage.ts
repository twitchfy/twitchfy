/**
 * Options for subscribing to the ChannelChatMessage event.
 */
export interface ChannelChatMessageOptions {
    /**
     * The broadcaster user ID to listen to chat messages for.
     */
    broadcaster_user_id: string
    /**
     * The user ID to read the chat as.
     */
    user_id: string
}