/**
 * The event sent by Twitch when a channel starts an ad break.
 * @internal
 */
export interface ChannelAdBreakBeginEvent {
    /**
     * The duration in seconds of the ad break.
     */
    duration_seconds: string
    /**
     * The ISO timestamp of when the ad break started.
     */
    started_at: string
    /**
     * Whether the ad break was automatically triggered or was manually triggered by the broadcaster.
     */
    is_automatic: boolean
    /**
     * The ID of the broadcaster.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster.
     */
    broadcaster_user_name: string
    /**
     * The ID of the user who triggered the ad break. For automatically triggered ad breaks, this is the broadcaster's ID.
     */
    requester_user_id: string
    /**
     * The login name of the user who triggered the ad break.
     */
    requester_user_login: string
    /**
     * The display name of the user who triggered the ad break.
     */
    requester_user_name: string
}