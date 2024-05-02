/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conduit } from '../structures';
import type { SubscriptionTypes } from '../enums';
import type { SubscriptionMessages } from '../interfaces';

export type ConduitSubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages<Conduit>[T]) => any | Promise<any> 