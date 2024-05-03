/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Express } from 'express';
import { HelixClient } from '@twitchfy/helix';
import { workerData, parentPort } from 'node:worker_threads';
import type { Conduit } from './Conduit';
import { parseRoute } from '../webhook';
import type { WebhookConnectionOptions } from '../webhook';
import { conduitMakeMiddlewares, ConduitSubscriptionRouter, findFirstMissingId, handleParentMessage } from '../util';

/**
 * A Webhook Shard created within a Conduit.
 */
export class WebhookShard {

  /**
   * The partial Conduit data which this shard belongs to.
   */
  private _conduit: Conduit | null = null;

  /**
   * The secret of the shard.
   */
  public readonly secret: string;

  /**
   * The base URL of the server for setting up the callback.
   */
  public readonly baseURL: string;

  /**
   * The route where the subscription notifications will be sent.
   */
  public readonly subscriptionRoute: string;

  /**
   * The Express server to handle the subscription notifications.
   */
  public readonly server: Express;

  /**
   * Whether to start the server at start.
   * @default false
   */
  public readonly startServer: boolean;

  /**
   * The HelixClient to interact with the Twitch API.
   * @private
   */
  private _helixClient: HelixClient = null;

  /**
   * The id of the shard.
   * @private
   */
  private _shardId: string = null;

  /**
   * The parent port to communicate with the parent thread.
   * @protected
   * @internal
   */
  protected _parentPort = parentPort;

  /**
   * Builds up a Webhook Shard.
   * @param options The options for the shard.
   * @param server The Express server to handle the subscription notifications.
   */
  public constructor(options: Pick<WebhookConnectionOptions, 'baseURL' | 'subscriptionRoute' | 'startServer' | 'secret'>, server: Express){

    this.baseURL = options.baseURL;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.server = server;

    this.secret = options.secret;

    this.startServer = typeof options.startServer === 'boolean' ? options.startServer : false;

  }

  /**
   * The URL used for receiving the subscription notifications. This is the combination of the baseURL and the subscriptionRoute.
   */
  public get url(){
    return `${this.baseURL}${this.subscriptionRoute}`;
  }

  /**
   * The id of the Conduit which this shard belongs to.
   */
  public get conduitId(){
    // @ts-expect-error
    return this._conduit._id;
  }

  /**
   * The HelixClient to interact with the Twitch API of this shard.
   */
  public get helixClient(){
    return this._helixClient;
  }

  /**
   * The id of the shard.
   */
  public get shardId(){
    return this._shardId;
  }

  /**
   * Starts the shard.
   * @param port The port to start the server at if the startServer option is set to true.
   * @param callback A callback to be called when the server is started if the startServer option is set to true.
   */
  public async start(port?: number, callback?: () => void){

    this._conduit = workerData.conduit;

    this._helixClient = new HelixClient(this._conduit.helixClient);

    const conduit = (await this._helixClient.getConduits()).find((conduit) => conduit.id === this.conduitId);

    const shards = await this._helixClient.getConduitShards(this.conduitId);

    const foundShard = shards.find((shard) => shard.transport.callback === this.url);
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
              callback: this.url,
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

  /**
   * Sends a debug packet to the parent thread to make a debug.
   * @param args The arguments to send.
   */
  public makeDebug(...args: any[]){
    this.sendPacket({ topic: 'debug', args });
  }

  /**
   * Sends a packet to the parent thread.
   * @param packet The packet to send.
   */
  public sendPacket(packet: object){
    parentPort.postMessage(packet);
  }
}