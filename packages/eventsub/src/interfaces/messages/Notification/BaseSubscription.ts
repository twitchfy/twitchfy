import { BaseTransport } from '.';
import { SubscriptionVersions, SubscriptionTypeOptions } from '../..';
import { SubscriptionTypes } from '../../../enums/';

export interface BaseSubscription<T extends SubscriptionTypes> {

    id: string
    status: 'enabled'
    type: T
    version: SubscriptionVersions[T]
    cost: number
    condition: SubscriptionTypeOptions[T]
    transport: BaseTransport
    created_at: string
}