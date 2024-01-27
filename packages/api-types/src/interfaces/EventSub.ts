import { Pagination } from './Pagination';

export interface PostEventSubscriptions {
    id: string
    status: string
    type: string
    version: string
    cost: number
    condition: object
    transport: object
    created_at: string
}

export interface PostEventSubscriptionsResponse {
    data: PostEventSubscriptions[]
    total: number
    total_cost: number
    max_total_cost: number
}

export interface GetEventSubscriptions {
    data: PostEventSubscriptions[]
    total: number
    pagination: Pagination
    total_cost: number
    max_total_cost: number
}