import type { TokenAdapter } from '@twitchapi/helix';
import type { SubscriptionTypeOptions } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes } from '../types';
import type { WebhookConnection } from '../webhook';


export type SubscriptionOptions<T extends SubscriptionTypes = SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> = {
    type: T
    options: SubscriptionTypeOptions[T]
    nonce?: string
} & (K extends WebhookConnection ? { appToken?: string } : { userToken?: TokenAdapter })