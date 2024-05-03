import type { ConduitShardData } from '@twitchfy/api-types';
import type { Conduit } from './Conduit';

/**
 * A shard created within a Conduit.
 */
export class Shard {

  /**
   * The Conduit that created this shard.
   */
  public readonly conduit: Conduit;

  /**
   * The id of the shard. Starting from 0.
   */
  public readonly id: string;

  /**
   * The type of transport of the shard.
   */
  public readonly type: 'websocket' | 'webhook';

  /**
   * The status of the shard. Probably 'enabled'.
   */
  public readonly status: string;

  /**
   * The callback of the shard. Only present in webhook type.
   */
  public readonly callback?: string;

  /**
   * The session id of the shard. Only present in websocket type.
   */
  public readonly sessionId?: string;

  /**
   * The secret of the shard. Only present in webhook type.
   */
  public readonly secret?: string;

  /**
   * Builds up a Shard.
   * @param conduit The Conduit that created this shard.
   * @param data The data from the API. If the shard is of type 'webhook', it aditionally includes the secret which is not returned by the API.
   */
  public constructor(conduit: Conduit, data: ConduitShardData & { transport: { secret?: string }}){
    
    this.conduit = conduit;
    
    this.id = data.id;
    
    this.type = data.transport.method;
    
    this.status = data.status;
    
    this.callback = data.transport.callback;
    
    this.sessionId = data.transport.session_id;

    this.secret = data.transport.secret;
  }

  /**
   * Converts the shard to the API format.
   * @returns The shard into API format.
   */
  public toAPI(){
    return {
      id: this.id,
      transport: {
        method: this.type,
        callback: this.callback,
        session_id: this.sessionId,
        secret: this.secret
      }
    };
  }

  /**
   * Deletes the shard.
   * @returns
   */
  public async delete(){
    return await this.conduit.deleteShard(this.id);
  }
}