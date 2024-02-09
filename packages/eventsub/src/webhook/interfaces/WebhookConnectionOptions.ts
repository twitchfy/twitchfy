import type { HelixOptions } from '../../interfaces';

export interface WebhookConnectionOptions {
    clientID: string
    clientSecret: string
    appToken: string
    baseURL: string
    secret: string
    helix?: HelixOptions
    subscriptionRoute?: string
    startServer?: boolean
    mantainSubscriptions?: boolean
}