import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { BaseMetadata } from './BaseMetadata';
import { BasePayload } from './BasePayload';

export interface BaseNotification<T extends SubscriptionTypes = SubscriptionTypes>{
    metadata: BaseMetadata<T>
    payload: BasePayload<T>
}