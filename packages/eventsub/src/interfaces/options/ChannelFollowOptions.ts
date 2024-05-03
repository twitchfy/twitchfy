/**
 * The options for subscribing to the ChannelFollow event.
 */
export interface ChannelFollowOptions {
    /**
     * The broadcaster user ID to listen to follow events for.
     */
    broadcaster_user_id: string
    /**
     * The ID of the moderator of the channel you want to get follow notifications for. If you have authorization from the broadcaster rather than a moderator, specify the broadcaster’s user ID here.
     */
    moderator_user_id: string
}