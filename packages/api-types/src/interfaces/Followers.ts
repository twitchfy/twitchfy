import { Pagination } from './Pagination';

export interface GetFollowers{
    user_id: string
    user_name: string
    user_login: string
    followed_at: string
}

export interface GetFollowersResponse{
    total: number
    data: GetFollowers[]
    pagination: Pagination
}