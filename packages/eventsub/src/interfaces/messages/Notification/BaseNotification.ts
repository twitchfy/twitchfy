import { BaseMetadata, BasePayload } from '.';
import { SubscriptionTypes } from '../../../enums';

export interface BaseNotification<T extends SubscriptionTypes = SubscriptionTypes>{
    metadata: BaseMetadata<T>
    payload: BasePayload<T>
}