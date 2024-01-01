import { Pagination } from './Pagination';

export interface GetStreamResponse {
    data: GetStream[]
    pagination: Pagination
}

export interface GetStream {
    id: string,
    user_id: string,
    user_login: string,
    user_name: string,
    game_id: string,
    game_name: string,
    type: string,
    title: string,
    tags: string[],
    viewer_count: number,
    started_at: string,
    language: string,
    thumbnail_url: string
    is_mature: false
}