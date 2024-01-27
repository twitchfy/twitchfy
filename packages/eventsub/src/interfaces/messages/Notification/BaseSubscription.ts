import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { SubscriptionVersions } from '../../../interfaces/SubscriptionVersions';
import { SubscriptionTypeOptions } from '../../../interfaces/SubscriptionTypeOptions';
import { BaseTransport } from './BaseTransport';

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