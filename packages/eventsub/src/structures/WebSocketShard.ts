/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HelixClient } from '@twitchfy/helix';
import { workerData, parentPort } from 'node:worker_threads';
import { WebSocketShardConnector } from './WebSocketShardConnector';
import type { Conduit } from './Conduit';
import { handleParentMessage } from '../util';
import type { WebSocketConnectionOptions } from '../ws';

/**
 * A WebSocket Shard created within a Conduit.
 */
export class WebSocketShard {

  /**
   * The partial Conduit data which this shard belongs to.
   */
  private _conduit: Conduit | null = null;

  /**
   * The WebSocket connector for this shard.
   */
  public ws: WebSocketShardConnector | null = null;

  /**
   * The proxy used for the WebSocket connection if it was specified.
   */
  public readonly proxy: string;

  /**
   * The session id of the shard received in the session_welcome message.
   * @private
   */
  private _sessionId: string;

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
   * @private
   */
  protected _parentPort = parentPort;

  /**
   * Builds up a WebSocketShard.
   * @param options The options for the WebSocketShard.
   */
  public constructor(options?: Pick<WebSocketConnectionOptions, 'proxy'>){

    this.proxy = options?.proxy;

  }

  /**
   * The session id of the shard.
   */
  public get sessionId(){
    return this._sessionId;
  }
  
  /**
   * Sets the session id of the shard.
   */
  public set sessionId(value: string){
    this._sessionId = value;
  }

  /**
   * The id of the Conduit which created this shard.
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
   * Connects the shard to the WebSocket connection. The Promise resolves when the connection is established and the session_welcome message was received.
   */
  public async connect(){

    this.ws = new WebSocketShardConnector(this);

    await this.ws.connect(this.proxy);

    this._conduit = workerData.conduit;

    parentPort.postMessage({ topic: 'shard.websocket.start', shard: { transport: { session_id: this.sessionId }} });

    const fn = handleParentMessage.bind(this);

    parentPort.on('message', fn);
  }

  /**
   * Sends a debug message to the parent thread.
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