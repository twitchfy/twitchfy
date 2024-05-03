/**
 * The event sent by Twitch when a all messages from a chatroom are cleared by an user with moderation permissions.
 * @internal
 */
export interface ChannelChatClearEvent {
    /**
     * The ID of the broadcaster who own the chatroom.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who own the chatroom.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who own the chatroom.
     */
    broadcaster_user_name: string
}