import type { HelixOptions } from '../../interfaces';

export interface WebhookConnectionOptions {
    clientID: string
    auth: string
    baseURL: string
    secret: string
    helix?: HelixOptions
    subscriptionRoute?: string
    startServer?: boolean
    mantainSubscriptions?: boolean
}