/* eslint-disable @typescript-eslint/no-explicit-any */
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



export class Conduit extends BaseConnection<Conduit, ConduitEvents>{

  private _id: string | null;

  public readonly shards: Map<string, Shard>;

  public readonly workers: Map<string, Worker>;

  private shardPaths: string[];

  public readonly dropSubsAtStart: boolean;

  public readonly deleteConduitOnNoShards: boolean;

  public readonly conduitCleanup: boolean;

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

  public get appToken(){
    return this.helixClient.appToken;
  }

  public get id(){
    return this._id;
  }

  public get shardCount(){
    return this.shards.size;
  }

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

  private async startup(){

    if(!this._id) {
      
      const conduit = await this.helixClient.createConduit(1);

      this._id = conduit.id;


    } else {
      
      const conduits = await this.helixClient.getConduits();

      const conduit = conduits.find((x) => x.id === this._id);

      if(!conduit) throw Error(`The conduit with id ${this._id} doesn't exist.`);

    }

    if(this.dropSubsAtStart) await processChunks(this, chunkArray(await this.helixClient.getEventSubSubscriptions(), 30));

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

  public async deleteShard(shardId: string){
      
    const shards = await this.helixClient.getConduitShards(this._id);
  
    const shard = shards.find((x) => x.id === shardId);
  
    if(!shard) throw Error(`The shard with id ${shardId} doesn't exist.`);

    if(shards.length === 1 && !this.deleteConduitOnNoShards){
      throw Error('You can\'t delete the last shard of a conduit.');
    } else if(shards.length === 1){
      await this.helixClient.deleteConduit(this._id);
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

  public async addShard(shard: string){

    await new Promise((resolve) => {

      const worker = new Worker(shard, { workerData: { conduit: { _id: this._id, helixClient: this.helixClient, conduitCleanup: this.conduitCleanup }, shards: [...this.shards.values()].map((x) => x.toAPI()) } });
  
      const fn = handleShardMessage.bind({ conduit: this, worker, resolve });

      worker.on('message', fn);

    });

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

      conduit.helixClient.deleteEventSubSubscription(subscription.id);

      conduit.makeDebug(`Drop subscription (${subscription.id}) at start because dropSubsAtStart was enabled.`);

    }

    index++;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}