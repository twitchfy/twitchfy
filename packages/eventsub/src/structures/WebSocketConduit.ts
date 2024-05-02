/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HelixClient } from '@twitchfy/helix';
import { workerData, parentPort } from 'node:worker_threads';
import { WebSocketConduitConnector } from './WebSocketConduitConnector';
import type { Conduit } from './Conduit';
import { findFirstMissingId, handleParentMessage } from '../util';
import type { WebSocketConnectionOptions } from '../ws';

export class WebSocketConduit {

  private _conduit: Conduit | null = null;

  public ws: WebSocketConduitConnector | null = null;

  public readonly proxy: string;

  private _sessionId: string;

  private _helixClient: HelixClient = null;

  private _shardId: string = null;

  protected _parentPort = parentPort;

  public constructor(options?: Pick<WebSocketConnectionOptions, 'proxy'>){

    this.proxy = options?.proxy;

  }


  public get sessionId(){
    return this._sessionId;
  }
  
  public set sessionId(value: string){
    this._sessionId = value;
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

  public async connect(){

    this.ws = new WebSocketConduitConnector(this);

    await this.ws.connect(this.proxy);

    this._conduit = workerData.conduit;

    this._helixClient = new HelixClient(this._conduit.helixClient);

    const conduit = (await this._helixClient.getConduits()).find((conduit) => conduit.id === this.conduitId);

    const shards = await this._helixClient.getConduitShards(this.conduitId);

    const missingId = findFirstMissingId(shards);

    if(conduit.shard_count === shards.length && !missingId) await this._helixClient.updateConduit({ id: this.conduitId, shard_count: shards.length + 1 });

    const data = await this._helixClient.updateConduitShards({
      conduit_id: this.conduitId,
      shards: [
        {
          id: missingId || shards.length.toString(),
          transport: {
            method: 'websocket',
            session_id: this.sessionId
          }
        }
      ]
    });

    this._shardId = data[0].id;

    parentPort.postMessage({ topic: 'shard.websocket.start', shard: data[0] });

    const fn = handleParentMessage.bind(this);

    parentPort.on('message', fn);
  }

  public makeDebug(...args: any[]){
    parentPort.postMessage({ topic: 'debug', args });
  }

  public sendPacket(packet: object){
    parentPort.postMessage(packet);
  }
}