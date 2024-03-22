import type { BaseTransport } from './BaseTransport';
import type { SubscriptionVersions } from '../../SubscriptionVersions';
import type { SubscriptionTypeOptions } from '../../SubscriptionTypeOptions';
import type { SubscriptionTypes } from '../../../enums/';

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