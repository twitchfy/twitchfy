/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TokenAdapter } from '@twitchfy/helix';
import type { PostEventSubSubscription } from '@twitchfy/api-types';
import { Worker } from 'node:worker_threads';
import { BaseConnection } from './BaseConnection';
import { Shard } from './Shard';
import { ConduitSubscription } from './ConduitSubscription';
import type { ConduitEvents } from '../interfaces';
import type { StorageAdapterGet, SubscriptionOptions } from '../types';
import { handleShardMessage, loadShards, SubscriptionVersionsObject } from '../util';
import type { ConduitOptions } from '../types';
import { Events } from '../enums';
import type { SubscriptionTypes } from '../enums';


/**
 * Represents a Conduit connection.
 */
export class Conduit extends BaseConnection<Conduit, ConduitEvents>{

  /**
   * The id of the conduit.
   * @private
   */
  private _id: string | null;

  /**
   * The shards of the conduit.
   */
  public readonly shards: Map<string, Shard>;

  /**
   * The workers of the conduit.
   */
  public readonly workers: Map<string, Worker>;

  /**
   * The paths of the shards to connect with.
   * @private
   */
  private shardPaths: string[];

  /**
   * Whether drop all subscriptions of the current conduit at start or not. Default is false.
   */
  public readonly dropSubsAtStart: boolean;

  /**
   * Whether to delete the conduit when you are going to delete the last shard of the conduit. Default is false. 
   */
  public readonly deleteConduitOnNoShards: boolean;

  /**
   * Whether to cleanup the conduit shards at start avoiding duplicate shards. Default is true.
   */
  public readonly conduitCleanup: boolean;

  /**
   * Builds up a new Conduit.
   * @param options The options of the conduit.
   */
  public constructor(options: ConduitOptions){
    
    super(options);

    this._id = options.conduitId ?? null;

    this.helixClient.setAppToken(options.appToken);

    this.shardPaths = options.shards;

    this.shards = new Map();

    this.workers = new Map();

    this.dropSubsAtStart = typeof options.dropSubsAtStart === 'boolean'? options.dropSubsAtStart : false;

    this.deleteConduitOnNoShards = typeof options.deleteConduitOnNoShards === 'boolean' ? options.deleteConduitOnNoShards : false;

    this.conduitCleanup = typeof options.conduitCleanup === 'boolean' ? options.conduitCleanup : true;
  }

  /**
   * The app token used to manage the conduit and its subscriptions.
   */
  public get appToken(){
    return this.helixClient.appToken;
  }

  /**
   * The id of the conduit.
   */
  public get id(){
    return this._id;
  }

  /**
   * The number of shards of the conduit created by this process. This number is not synchronized with the API.
   */
  public get shardCount(){
    return this.shards.size;
  }

  /**
   * Starts the conduit and all the shards in the Conduit's options. The promise will resolve when all the shards are fully enabled within the API.
   * @returns 
   */
  public async start(){
    return await this.startup();
  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>){

    const { type, options: subscriptionOptions } = options;
 
    const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'conduit', conduit_id: this._id }, condition: subscriptionOptions }, { useTokenType: 'app' });

    for(const worker of this.workers.values()){
      worker.postMessage({ topic: 'subscription.add', subscription: data });
    }

    const subscription = new ConduitSubscription<T>(this, options, data);

    await this.storage?.set(subscription.id, subscription);

    this.subscriptions.set(subscription.id, subscription);

    this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;

  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptions<T>[]){

    const subscriptions: ConduitSubscription<T>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions } = sub;
 
      const data = await this.helixClient.subscribeToEventSub({ type, version: SubscriptionVersionsObject[type], transport: { method: 'conduit', conduit_id: this._id }, condition: subscriptionOptions }, { useTokenType: 'app' });

      const subscription = new ConduitSubscription<T>(this, sub, data);

      for(const worker of this.workers.values()){
        worker.postMessage({ topic: 'subscription.add', subscription: data });
      }

      await this.storage?.set(subscription.id, subscription);

      this.subscriptions.set(subscription.id, subscription);

      this.makeDebug(`Subscribed to ${data.type} (${data.id})`);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions;

  }

  /**
   * Starts all the conduit and reload all the subscriptions that were stored in the storage.
   * @internal
   * @private
   */
  private async startup(){

    if(!this._id) {
      
      const conduit = await this.helixClient.createConduit(1);

      this._id = conduit.id;


    } else {
      
      const conduits = await this.helixClient.getConduits();

      const conduit = conduits.find((x) => x.id === this._id);

      if(!conduit) throw Error(`The conduit with id ${this._id} doesn't exist.`);

    }

    if(this.dropSubsAtStart) await processChunks(this, chunkArray((await this.helixClient.getEventSubSubscriptions()).filter((x) => x.transport.conduit_id === this._id), 30));

    if(this.maintainSubscriptions){

      const apiSubs = await this.helixClient.getEventSubSubscriptions({ status: 'enabled' });

      const filteredSubs = apiSubs.filter((x) => x.transport.method === 'conduit' && x.transport.conduit_id === this._id);

      this.makeDebug(`Fetched a total of ${apiSubs.length} API Subscriptions. Filtered to ${filteredSubs.length} for this conduit.`);

      const storage = (await this.storage.getAll()).reduce((acc: StorageAdapterGet<Conduit>[], x: StorageAdapterGet<Conduit>) => {
        const equal = acc.find((i) => i.type === x.type && JSON.stringify(i.options) === JSON.stringify(x.options));
        if(!equal) acc.push(x);
        return acc;
      }, []);

      for await(const data of storage){
        
        const filteredSub = filteredSubs.find((x) => x.id === data.id || (x.type === data.type && JSON.stringify(x.condition) === JSON.stringify(data.options)));

        if(!filteredSub){

          const subscriptionData = await this.helixClient.subscribeToEventSub({ type: data.type, condition: data.options, transport: { method: 'conduit', conduit_id: this._id }, version: SubscriptionVersionsObject[data.type] });

          const subscription = new ConduitSubscription<typeof data.type>(this, data, subscriptionData);

          await this.storage.delete(data.id);

          await this.storage.set(subscription.id, subscription);

          this.subscriptions.set(subscription.id, subscription);

          for(const worker of this.workers.values()){
            worker.postMessage({ topic: 'subscription.add', subscription: subscriptionData });
          }

          this.makeDebug(`Created subscription as it couldn't be reloaded (${subscription.type}) (not exist or it status was revoked) ${subscription.id}`);

          this.emit(Events.SubscriptionReload, subscription);

        } else {

          const subscription = new ConduitSubscription<typeof data.type>(this, data, filteredSub);

          for(const worker of this.workers.values()){
            worker.postMessage({ topic: 'subscription.add', subscription: filteredSub });
          }

          if(data.id !== filteredSub.id){

            await this.storage.delete(data.id);

            await this.storage.set(filteredSub.id, subscription);

          }

          this.subscriptions.set(filteredSub.id, subscription);

          this.makeDebug(`Reloaded subscription ${subscription.type} ${subscription.id}`);

          this.emit(Events.SubscriptionReload, subscription);

        }
      }
      
    }

    const shards = await loadShards(this.shardPaths);

    for(const shard of shards){
      await this.addShard(shard);
    }

    this.emit(Events.ConnectionReady, this);
  }

  /**
   * Deletes a shard of a conduit. This operation is not recommended as it could result in an error unless all the shards of the conduit are being created within the same process.
   */
  public async deleteShard(shardId: string){
      
    const shards = await this.helixClient.getConduitShards(this._id);
  
    const shard = shards.find((x) => x.id === shardId);
  
    if(!shard) throw Error(`The shard with id ${shardId} doesn't exist.`);

    if(shards.length === 1 && !this.deleteConduitOnNoShards){
      throw Error('You can\'t delete the last shard of a conduit.');
    } else if(shards.length === 1){
      await this.helixClient.deleteConduit(this._id);
      this.shards.clear();
      await [...this.workers.values()][0].terminate();
      this.workers.clear();
      return [];
    }

    if(shards[shards.length - 1].transport.method === 'webhook' && !this.shards.get(shards[shards.length - 1].id)?.secret){
      this.makeDebug(`The last shard is a webhook ${shards.length} and doesn't have a secret. Can't delete the shard ${shardId}.`);
      return shards.map((x) => new Shard(this, x));
    }
  
    await this.helixClient.updateConduitShards({
      conduit_id: this._id,
      shards: [
        {
          id: shard.id,
          transport: {
            ...shards[shards.length - 1].transport,
            secret: this.shards.get(shards[shards.length - 1].id)?.secret
          
          }
        }
      ]
    });

    await this.helixClient.updateConduit({ 
      id: this._id,
      shard_count: shards.length - 1 ?? 1
    });

    if(this.shards.has(shards[shards.length - 1].id)){
      this.shards.delete(shardId);
      this.shards.delete(shards[shards.length - 1].id);
      this.shards.set(shardId, new Shard(this, { ...shards[shards.length - 1], id: shardId }));
    }

    const deletedWorker = this.workers.get(shardId);

    if(deletedWorker){
      await deletedWorker.terminate();
      this.workers.delete(shardId);
    }

    const replacedWorker = this.workers.get(shards[shards.length - 1].id);

    if(replacedWorker) {
      this.workers.set(shardId, replacedWorker);
      this.workers.delete(shards[shards.length - 1].id);
      replacedWorker.postMessage({ topic: 'shardId.replace', shardId });
    }

    return (await this.helixClient.getConduitShards(this._id)).map((x) => new Shard(this, x));
  }

  /**
   * Adds a shard to the conduit.
   */
  public async addShard(shard: string){

    await new Promise((resolve) => {

      const worker = new Worker(shard, { workerData: { conduit: { _id: this._id, helixClient: this.helixClient, conduitCleanup: this.conduitCleanup }, shards: [...this.shards.values()].map((x) => x.toAPI()) } });
  
      const fn = handleShardMessage.bind({ conduit: this, worker, resolve });

      worker.on('message', fn);

    });

  }

  /**
   * Sets a new app token for the conduit.
   * @param appToken The new app token.
   * @returns The conduit.
   */
  public setAuth(appToken: TokenAdapter<'app'>){

    this.helixClient.setAppToken(appToken);

    return this;
  }
}

function chunkArray(array: PostEventSubSubscription[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}


async function processChunks(conduit: Conduit, chunks: PostEventSubSubscription[][]) {

  let index = 0;

  while (index < chunks.length) {
    
    const chunk = chunks[index];

    for(const subscription of chunk){

      if(subscription.transport.method !== 'conduit') continue;

      conduit.helixClient.deleteEventSubSubscription(subscription.id);

      conduit.makeDebug(`Drop subscription (${subscription.id}) at start because dropSubsAtStart was enabled.`);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}