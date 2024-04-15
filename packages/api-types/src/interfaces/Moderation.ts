import type { Pagination } from './Pagination';

export interface GetModeratedChannelsResponse {
    data: ModeratedChannel[]
    pagination: Pagination
}

export interface ModeratedChannel {
    broadcaster_name: string
    broadcaster_id: string
    broadcaster_login: string
}