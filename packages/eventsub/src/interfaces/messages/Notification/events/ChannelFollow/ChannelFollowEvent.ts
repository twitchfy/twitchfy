/**
 * An event that represents a broadcaster being followed by a user.
 */
export interface ChannelFollowEvent {
    /**
     * The id of the user who followed the channel.
     */
    user_id: string
    /**
     * The login name of the user who followed the channel.
     */
    user_login: string
    /**
     * The display name of the user who followed the channel.
     */
    user_name: string
    /**
     * The ID of the broadcaster who was followed.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who was followed.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who was followed.
     */
    broadcaster_user_name: string
    /**
     * The ISO timestamp of when the user was followed.
     */
    followed_at: string
}