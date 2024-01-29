/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectionTypes } from '.';
import { SubscriptionMessages } from '../interfaces';
import { SubscriptionTypes } from '../enums';

export type SubscriptionCallback<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> = (message: SubscriptionMessages<K>[T]) => any | Promise<any> 