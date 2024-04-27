import type { Pagination } from './Pagination';

export interface PostEventSubSubscriptionBody {
    type: string
    version: string
    condition: object
    transport: PostEventSubSubscriptionTransport
    
}

export interface PostEventSubSubscriptionTransport {
    method: 'webhook' | 'websocket' | 'conduit'
    callback?: string
    secret?: string
    session_id?: string
    conduit_id?: string
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

export interface PostEventSubSubscriptionsResponse {
    data: PostEventSubSubscription[]
    total: number
    total_cost: number
    max_total_cost: number
}

export interface GetEventSubSubscriptions {
    data: GetEventSubSubscription[]
    total: number
    pagination: Pagination
    total_cost: number
    max_total_cost: number
}

export interface PostCreateConduitResponse {
    data: ConduitData[]
}

export interface ConduitData {
    id: string
    shard_count: number
}

export interface PatchUpdateConduitShardsResponse {
    data: ConduitShardData[]
    errors: PathUpdateConduitShardsError[]
}

export interface PathUpdateConduitShardsError {
    id: string
    message: string
}

export interface ConduitShardData {
    id: string
    status: string
    transport: { method: 'websocket' | 'webhook', callback?: string, session_id?: string, connected_at?: string, disconnected_at?: string }
}

export interface GetConduitsResponse {
    data: ConduitData[]
}

export interface PatchUpdateConduitResponse {
    data: ConduitData[]
}

export interface GetConduitShardsResponse {
    data: ConduitShardData[]
    pagination: Pagination
}