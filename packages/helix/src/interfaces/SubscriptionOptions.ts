import { SubscriptionTransport } from './SubscriptionTransport';

export interface SubscriptionOptions {
    type: string
    version: number
    condition: object
    transport: SubscriptionTransport
    
}