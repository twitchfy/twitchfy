import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { SubscriptionVersions } from '../../SubscriptionVersions';

export interface BaseMetadata<T extends SubscriptionTypes>{

    message_id: string
    message_type: 'notification'
    message_timestamp: string
    subscription_type: T
    subscription_version: SubscriptionVersions[T];
}
