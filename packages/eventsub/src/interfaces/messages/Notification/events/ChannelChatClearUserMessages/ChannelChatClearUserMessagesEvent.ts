/**
 * The event sent by Twitch when a user's specific messages are cleared by a moderator in a channel. Normally, this happens when the user is banned or set into a timeout.
 * @internal
 */
export interface ChannelChatClearUserMessagesEvent {
    /**
     * The ID of the broadcaster who owns the channel.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who owns the channel.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who owns the channel.
     */
    broadcaster_user_name: string
    /**
     * The ID of the user whose messages were cleared.
     */
    target_user_id: string
    /**
     * The login name of the user whose messages were cleared.
     */
    target_user_login: string
    /**
     * The display name of the user whose messages were cleared.
     */
    target_user_name: string
}