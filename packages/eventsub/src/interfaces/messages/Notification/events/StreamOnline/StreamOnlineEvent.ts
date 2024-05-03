import type { StreamTypes } from '../../../../../types';

/**
 * The event sent by Twitch when a stream goes online.
 */
export interface StreamOnlineEvent {
    /**
     * The ID of the stream which has started.
     */
    id: string
    /**
     * The ID of the broadcaster who started the stream.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who started the stream.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who started the stream.
     */
    broadcaster_user_name: string
    /**
     * The type of the stream. Currently, this is always "live".
     */
    type: StreamTypes
    /**
     * The ISO timestamp of when the stream started.
     */
    started_at: string
}