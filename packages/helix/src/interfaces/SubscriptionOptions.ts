import type { SubscriptionTransport } from './SubscriptionTransport';

export interface SubscriptionOptions {
    type: string
    version: string
    condition: object
    transport: SubscriptionTransport
    
}