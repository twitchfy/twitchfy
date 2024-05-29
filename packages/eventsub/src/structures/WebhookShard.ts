/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IncomingHttpHeaders } from 'node:http';
import type { Express, Request } from 'express';
import { workerData, parentPort } from 'node:worker_threads';
import type { Conduit } from './Conduit';
import type { SubscriptionTypes } from '../enums';
import type { BasePayload } from '../interfaces';
import { parseRoute, verifySignature } from '../webhook';
import type { WebhookConnectionOptions , Body } from '../webhook';
import { conduitMakeMiddlewares, conduitNotificationHandler, ConduitSubscriptionRouter, handleParentMessage } from '../util';

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
  public readonly server: Express | null;

  /**
   * Whether to start the server at start.
   * @default false
   */
  public readonly startServer: boolean;

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
  public constructor(options: Pick<WebhookConnectionOptions, 'baseURL' | 'subscriptionRoute' | 'startServer' | 'secret'>, server?: Express){

    this.baseURL = options.baseURL;

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.server = server ?? null;

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
   * The id of the shard.
   */
  public get shardId(){
    return this._shardId;
  }

  /**
   * Used for handling incoming Twitch requests in your custom non-Express server.
   * @param headers The headers of the request.
   * @param body The body of the request.
   * @param verification A callback to be called when the request is a webhook callback verification and you need to send the challenge.
   * @param success A callback to be called when the handling has suceeded. You will need to send a 200 status in the response after that.
   * @param invalidSignature A callback which is executed when the signature that has been sent by the requester is incorrect.
   * @returns 
   */
  public async post(headers: IncomingHttpHeaders, body: any, verification: (challenge: string) => any, success: () => any, invalidSignature?: () => any){
    
    if(!headers['twitch-eventsub-message-signature']) return invalidSignature?.();

    setBodyType(body);

    if(!verifySignature(headers, body, this.secret)){
      this.makeWarn('Received a request with an invalid signature.');
      return invalidSignature?.();
    }

    if(headers['twitch-eventsub-message-type'] === 'webhook_callback_verification'){
      this.makeDebug(`Get webhook callback verification for shard (${this._shardId})`);
      verification((body as Body<'webhook_callback_verification'>).challenge);
      let shardId = this._shardId;
      while(!shardId){
        shardId = this._shardId;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      parentPort.postMessage({ topic: 'webhook.callback.verified', shardId : this._shardId });
      return;
    }

    success();
    switch(headers['twitch-eventsub-message-type']){
    case 'notification': {
      await conduitNotificationHandler.bind(this)(body);
    }
      break;
    case 'revocation': {
      this.makeWarn(`Subscription was revoked (${body.subscription.id})`);
    }
      break;
    }

  }

  /**
   * Starts the shard.
   * @param port The port to start the server at if the startServer option is set to true.
   * @param callback A callback to be called when the server is started if the startServer option is set to true.
   */
  public async start(port?: number, callback?: () => void){

    this._conduit = workerData.conduit;
  
    const fn = handleParentMessage.bind(this);

    parentPort.on('message', fn);

    if(this.startServer && this.server) this.server?.listen(port, callback);

    if(this.server){

      conduitMakeMiddlewares.bind(this)(this.server);

      this.server.use(this.subscriptionRoute, ConduitSubscriptionRouter);
    }

    parentPort.postMessage({ topic: 'shard.webhook.start', shard: { transport: { callback: this.url, secret: this.secret }}});

  
  }

  /**
   * Sends a debug packet to the parent thread to make a debug.
   * @param args The arguments to send.
   */
  public makeDebug(...args: any[]){
    this.sendPacket({ topic: 'debug', args });
  }

  /**
   * Sends a warn packet to the parent thread to make a warning.
   * @param args The arguments to send.
   */
  public makeWarn(...args: any[]){
    this.sendPacket({ topic: 'warn', args });
  }

  /**
   * Sends a packet to the parent thread.
   * @param packet The packet to send.
   */
  public sendPacket(packet: object){
    parentPort.postMessage(packet);
  }
}

function setBodyType<T extends SubscriptionTypes>(body: Request['body']): asserts body is BasePayload<T> {}