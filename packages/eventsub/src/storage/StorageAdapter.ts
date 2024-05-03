/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes, StorageAdapterGet, SubscriptionType } from '../types';

/**
 * The base class for building up a storage adapter used for reloading subscriptions.
 */
export abstract class StorageAdapter<K extends ConnectionTypes> {

  /**
   * Sets a subscription into the storage.
   * @param id The id of the subscription which will be set. Probably you want to use the id as a key.
   * @param subscription The subscription which will be set.
   */
  abstract set<T extends SubscriptionTypes = SubscriptionTypes>(id: string, subscription: SubscriptionType<T, K>): Promise<any> | any;

  /**
   * Gets a subscription from the storage.
   * @param id The id of the subscription which will be get.
   * @returns The basic data which will be needed to reload the subscription. You can attach other data to the object.
   */
  abstract get<T extends SubscriptionTypes = SubscriptionTypes>(id: string): Promise<StorageAdapterGet<K, T>> | StorageAdapterGet<K, T>;

  /**
   * Gets all subscriptions from the storage.
   */
  abstract getAll(): Promise<StorageAdapterGet<K>[]> | StorageAdapterGet<K>[]

  /**
   * Deletes a subscription from the storage.
   * @param id The id of the subscription which will be deleted.
   */
  abstract delete(id: string): Promise<void> | any;

}