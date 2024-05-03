import type { SubscriptionTypes } from '../../../enums';
import type { SubscriptionVersions } from '../../SubscriptionVersions';

/**
 * The base metadata for all notification messages.
 
 */
export interface BaseMetadata<T extends SubscriptionTypes>{
    message_id: string
    message_type: 'notification'
    message_timestamp: string
    subscription_type: T
    subscription_version: SubscriptionVersions[T];
}
