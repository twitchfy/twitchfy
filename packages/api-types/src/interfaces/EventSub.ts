import type { Pagination } from './Pagination';

export interface PostEventSubSubscriptionBody {
    type: string
    version: string
    condition: object
    transport: PostEventSubSubscriptionTransport
    
}

export interface PostEventSubSubscriptionTransport {
    method: 'webhook' | 'websocket'
    callback?: string
    secret?: string
    session_id?: string
}

export interface PostEventSubSubscription {
    id: string
    status: string
    type: string
    version: string
    cost: number
    condition: object
    transport: PostEventSubSubscriptionTransport
    created_at: string
}

export interface GetEventSubSubscription extends PostEventSubSubscription {}

export interface PostEventSubscriptionsResponse {
    data: PostEventSubSubscription[]
    total: number
    total_cost: number
    max_total_cost: number
}

export interface GetEventSubscriptions {
    data: GetEventSubSubscription[]
    total: number
    pagination: Pagination
    total_cost: number
    max_total_cost: number
}