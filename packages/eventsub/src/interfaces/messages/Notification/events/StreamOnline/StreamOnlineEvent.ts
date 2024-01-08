import { StreamTypes } from '../../../../../types/StreamTypes';

export interface StreamOnlineEvent {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    type: StreamTypes
    started_at: string
}