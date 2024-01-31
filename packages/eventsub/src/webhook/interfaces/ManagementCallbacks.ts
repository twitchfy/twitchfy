import type { WebhookConnection } from '../structures';
import type { Subscription } from '../../structures';
import type { SubscriptionTypes } from '../../enums';

export interface ManagementCallbacks {
    create: (subscription: Subscription<SubscriptionTypes, WebhookConnection>) => Promise<void> | void
    delete: (id: string) => Promise<void> | void
    get: (id: string) => Promise<string | null> | string | null
    secretKey?: string
}