import { SubscriptionTypes } from '../../../enums';
import { SubscriptionVersions } from '../..';

export interface BaseMetadata<T extends SubscriptionTypes>{

    message_id: string
    message_type: 'notification'
    message_timestamp: string
    subscription_type: T
    subscription_version: SubscriptionVersions[T];
}
