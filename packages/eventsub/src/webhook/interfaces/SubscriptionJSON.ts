/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SubscriptionJSON {
    [key: string]: JSON
}

export interface JSON {
    secret: string
    nonce: string
}