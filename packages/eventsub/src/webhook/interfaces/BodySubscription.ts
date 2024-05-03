/**
 * The subscription data sent in a notification body.
 */
export interface BodySubscription {
    /**
     * The subscription id.
     */
    id: string
    /**
     * The status of the subscription.
     */
    status: string
    /**
     * The type of the subscription.
     */
    type: string
    /**
     * The version of the subscription.
     */
    version: string
    /**
     * The cost of the subscription.
     */
    cost: number
    /**
     * The condition of the subscription.
     */
    condition: object
    /**
     * The transport of the subscription.
     */
    transport: Transport
    /**
     * The date when the subscription was created.
     */
    created_at: string
}

/**
 * The transport of the subscription.
 */
export interface Transport {
    method: string
    callback: string
}
