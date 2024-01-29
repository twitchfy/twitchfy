/* eslint-disable @typescript-eslint/no-explicit-any */

import { Subscription } from '.';
import { SubscriptionTypes } from '../enums';
import { ConnectionTypes } from '../types';


export class SubscriptionCollection<K extends ConnectionTypes = ConnectionTypes, T extends SubscriptionTypes = SubscriptionTypes> extends Map<string, Subscription<T, K>> {

  override get<U extends T>(key: string): Subscription<U, K> | undefined {
    return super.get(key) as any;
  }

  override set<U extends T>(key: string, value: Subscription<U, K>): this {
    return super.set(key, value) as any;
  }
}