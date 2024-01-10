/* eslint-disable @typescript-eslint/no-explicit-any */

import { SubscriptionMessages } from '../interfaces/SubscriptionMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export type SubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages[T]) => any | Promise<any> 