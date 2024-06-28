/**
 * The event sent by Twitch when a stream goes offline.
 */
export interface StreamOfflineEvent {
    /**
     * The broadcaster user ID for the stream that went offline.
     */
    broadcaster_user_id: string;
    /**
     * The broadcaster user login for the stream that went offline.
     */
    broadcaster_user_login: string;
    /**
     * The broadcaster user name for the stream that went offline.
     */
    broadcaster_user_name: string;
}