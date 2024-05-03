import { SubscriptionModel } from './MongoAdapterSchema';
import { StorageAdapter } from '../StorageAdapter';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType, StorageAdapterGet } from '../../types';
import { WebhookSubscription } from '../../webhook';

/**
 * The MongoDB storage adapter.
 */
export class MongoAdapter<K extends ConnectionTypes> extends StorageAdapter<K> {

  public constructor(){
    super();
  }

  public async set<T extends SubscriptionTypes = SubscriptionTypes>(id: string, subscription: SubscriptionType<T, K>){

    if(subscription instanceof WebhookSubscription){
 
      const { secret, type, options, nonce } = subscription;


      await new SubscriptionModel({
        id,
        secret,
        type,
        options,
        nonce
      }).save();

    } else {

      const { type, options, nonce } = subscription;


      await new SubscriptionModel({
        id,
        type,
        options,
        nonce
      }).save();

    }

    return;
  }

  public async get<T extends SubscriptionTypes = SubscriptionTypes>(id: string){

    return await SubscriptionModel.findOne({ id }) as StorageAdapterGet<K, T>;

  }

  public async delete(id: string){

    await SubscriptionModel.deleteOne({ id });

    return;

  }

  public async getAll(){
    return await SubscriptionModel.find() as StorageAdapterGet<K>[];
  }



}