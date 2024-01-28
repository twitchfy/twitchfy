export interface BodySubscription {
    id: string
    status: string
    type: string
    version: string
    cost: number
    condition: Condition
    transport: Transport
    created_at: string
}

export interface Condition {
    broadcaster_user_id: string
}

export interface Transport {
    method: string
    callback: string
}

