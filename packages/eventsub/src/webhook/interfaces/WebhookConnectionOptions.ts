import { HelixOptions } from '../../interfaces/HelixOptions';

export interface WebhookConnectionOptions {
    clientID: string
    auth: string
    baseURL: string
    helix?: HelixOptions
    subscriptionRoute?: string
    startServer?: boolean
}