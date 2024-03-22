/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes, StorageAdapterGet, SubscriptionType } from '../types';

export abstract class StorageAdapter<K extends ConnectionTypes> {

  abstract set<T extends SubscriptionTypes = SubscriptionTypes>(id: string, subscription: SubscriptionType<T, K>): Promise<any> | any;

  abstract get<T extends SubscriptionTypes = SubscriptionTypes>(id: string): Promise<StorageAdapterGet<K, T>> | StorageAdapterGet<K, T>;

  abstract getAll(): Promise<StorageAdapterGet<K>[]> | StorageAdapterGet<K>[]

  abstract delete(id: string): Promise<void> | any;

}