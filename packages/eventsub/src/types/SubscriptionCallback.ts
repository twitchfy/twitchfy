/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectionTypes } from './ConnectionTypes';
import { SubscriptionMessages } from '../interfaces/SubscriptionMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export type SubscriptionCallback<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> = (message: SubscriptionMessages<K>[T]) => any | Promise<any> 