/* eslint-disable @typescript-eslint/ban-types*/

import { type RedisOptions, Redis } from 'ioredis';
import { StorageAdapter } from '../StorageAdapter';
import type { SubscriptionTypes } from '../../enums';
import { WebhookSubscription } from '../../webhook';
import type { ConnectionTypes, StorageAdapterGet, SubscriptionType } from '../../types';

/**
 * The Redis storage adapter.
 */
export class RedisAdapter<K extends ConnectionTypes> extends StorageAdapter<K>{
    
  public client: Redis;

  /**
   * Builds up the Redis storage adapter.
   * @param data The data for the redis connection.
   */
  public constructor(data: ({ options: RedisOptions} | { client: Redis } | {}) = {}){

    super();

    this.client = 'client' in data ? data.client : 'options' in data ? new Redis(data.options) : new Redis();

  }

  public async set<T extends SubscriptionTypes = SubscriptionTypes>(id: string, subscription: SubscriptionType<T, K>){

    if(subscription instanceof WebhookSubscription){
 
      const { secret, type, options, nonce } = subscription;


      await this.client.hset('subscriptions', id, JSON.stringify({ id, secret, type, options, nonce }));

    } else {

      const { type, options, nonce } = subscription;


      await this.client.hset('subscriptions', id, JSON.stringify({ id, type, options, nonce }));

    }

    return;
  }

  public async get<T extends SubscriptionTypes = SubscriptionTypes>(id: string){

    return JSON.parse(await this.client.hget('subscriptions', id)) as StorageAdapterGet<K, T>;

  }

  public async delete(id: string){

    await this.client.hdel('subscriptions', id);

    return;

  }

  public async getAll() {

    const data = await this.client.hgetall('subscriptions');

    return Object.values(data).map((x) => JSON.parse(x)) as StorageAdapterGet<K>[];

  }

}