import type { BaseMetadata } from './BaseMetadata';
import type { BasePayload } from './BasePayload';
import type { SubscriptionTypes } from '../../../enums';

export interface BaseNotification<T extends SubscriptionTypes = SubscriptionTypes>{
    metadata: BaseMetadata<T>
    payload: BasePayload<T>
}