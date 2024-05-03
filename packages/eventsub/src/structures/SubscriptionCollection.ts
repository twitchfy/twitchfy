/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SubscriptionTypeOptions } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes, SubscriptionType } from '../types';


/**
 * The collection of subscriptions. This is an extended class of Map.
 */
export class SubscriptionCollection<K extends ConnectionTypes = ConnectionTypes, T extends SubscriptionTypes = SubscriptionTypes> extends Map<string, SubscriptionType<T, K>> {

  /**
   * Gets a subscription from the collection by its id.
   * @param id The id of the subscription.
   * @returns The subscription if it exists, otherwise undefined.
   */
  override get<U extends T>(id: string): SubscriptionType<U, K> | undefined {
    return super.get(id) as any;
  }

  /**
   * Sets a subscription into collection.
   * @param id The id of the subscription.
   * @param value The subscription to set.
   * @returns The updated collection.
   */
  override set<U extends T>(id: string, value: SubscriptionType<U, K>): this {
    return super.set(id, value) as any;
  }

  /**
   * Checks whether a subscription exists in the collection by its type and options.
   * @param type The type of the subscription.
   * @param options The options used to create the subscription.
   * @returns Whether the subscription exists. If it exists, the subscription is returned.
   */
  public exist<U extends T>(type: U, options: SubscriptionTypeOptions[U]): SubscriptionType<U, K> | undefined {

    const subscriptions = Array.from(this.values());

    return subscriptions.find((x) => x.checkSubscriptionType(type) && JSON.stringify(x.options) === JSON.stringify(options)) as SubscriptionType<U, K>; 

  }
}