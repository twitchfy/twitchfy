import type { Pagination } from './Pagination';

export interface GetChattersResponse{
    data: Chatter[]
    pagination: Pagination
    total: number
}

export interface Chatter{
    user_id: string
    user_login: string
    user_name: string
}