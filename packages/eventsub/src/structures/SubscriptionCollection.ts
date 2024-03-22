/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SubscriptionTypeOptions } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes, SubscriptionType } from '../types';


export class SubscriptionCollection<K extends ConnectionTypes = ConnectionTypes, T extends SubscriptionTypes = SubscriptionTypes> extends Map<string, SubscriptionType<T, K>> {

  override get<U extends T>(key: string): SubscriptionType<U, K> | undefined {
    return super.get(key) as any;
  }

  override set<U extends T>(key: string, value: SubscriptionType<U, K>): this {
    return super.set(key, value) as any;
  }

  public exist<U extends T>(type: U, options: SubscriptionTypeOptions[U]){

    const subscriptions = Array.from(this.values());

    return subscriptions.find((x) => x.checkSubscriptionType(type) && JSON.stringify(x.options) === JSON.stringify(options)); 

  }
}