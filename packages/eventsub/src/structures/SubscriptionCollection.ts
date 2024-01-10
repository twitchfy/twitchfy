/* eslint-disable @typescript-eslint/no-explicit-any */

import { Subscription } from './Subscription';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';


export class SubscriptionCollection<T extends SubscriptionTypes = SubscriptionTypes> extends Map<string, Subscription<T>> {

  override get<K extends T>(key: string): Subscription<K> | undefined {
    return super.get(key) as any;
  }

  override set<K extends T>(key: string, value: Subscription<K>): this {
    return super.set(key, value) as any;
  }
}