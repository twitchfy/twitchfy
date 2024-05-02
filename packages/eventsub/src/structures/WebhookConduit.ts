/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Express } from 'express';
import { HelixClient } from '@twitchfy/helix';
import { workerData, parentPort } from 'node:worker_threads';
import type { Conduit } from './Conduit';
import { parseRoute } from '../webhook';
import type { WebhookConnectionOptions } from '../webhook';
import { conduitMakeMiddlewares, ConduitSubscriptionRouter, findFirstMissingId, handleParentMessage } from '../util';

export class WebhookConduit {

  private _conduit: Conduit | null = null;

  public readonly secret: string;

  public readonly baseURL: string;

  public readonly subscriptionRoute: string;

  public readonly server: Express;

  public readonly startServer: boolean;

  private _helixClient: HelixClient = null;

  private _shardId: string = null;

  protected _parentPort = parentPort;

  public constructor(options: Pick<WebhookConnectionOptions, 'baseURL' | 'subscriptionRoute' | 'startServer' | 'secret'>, server: Express){

    this.baseURL = options.baseURL;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.server = server;

    this.secret = options.secret;

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : false;

  }

  public get conduitId(){
    // @ts-expect-error
    return this._conduit._id;
  }

  public get helixClient(){
    return this._helixClient;
  }

  public get shardId(){
    return this._shardId;
  }

  public async start(port?: number, callback?: () => void){

    this._conduit = workerData.conduit;

    this._helixClient = new HelixClient(this._conduit.helixClient);

    const conduit = (await this._helixClient.getConduits()).find((conduit) => conduit.id === this.conduitId);

    const shards = await this._helixClient.getConduitShards(this.conduitId);

    const foundShard = shards.find((shard) => shard.transport.callback === `${this.baseURL}${this.subscriptionRoute}`);
    if(foundShard){
      this._shardId = foundShard.id;
      parentPort.postMessage({ topic: 'shard.webhook.start', shard: { ...foundShard, transport: { ...foundShard.transport, secret: this.secret }}});
    } else {

      const missingId = findFirstMissingId(shards);

      if(conduit.shard_count === shards.length && !missingId) await this.helixClient.updateConduit({ id: this.conduitId, shard_count: shards.length + 1  });
      const data = await this._helixClient.updateConduitShards({
        conduit_id: this.conduitId,
        shards: [
          {
            id: missingId || shards.length.toString(),
            transport: {
              method: 'webhook',
              callback: `${this.baseURL}${this.subscriptionRoute}`,
              secret: this.secret
            }
          }
        ]
      });

      this._shardId = data[0].id;

      parentPort.postMessage({ topic: 'shard.webhook.start', shard: { ...data[0], transport: { ...data[0].transport, secret: this.secret }}});
    }


    const fn = handleParentMessage.bind(this);

    parentPort.on('message', fn);

    if(this.startServer) this.server.listen(port, callback);

    conduitMakeMiddlewares.bind(this)(this.server);

    this.server.use(this.subscriptionRoute, ConduitSubscriptionRouter);
  }

  public makeDebug(...args: any[]){
    parentPort.postMessage({ topic: 'debug', args });
  }

  public sendPacket(packet: object){
    parentPort.postMessage(packet);
  }
}