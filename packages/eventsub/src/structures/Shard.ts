import type { ConduitShardData } from '@twitchfy/api-types';
import type { Conduit } from './Conduit';

export class Shard {

  public readonly conduit: Conduit;

  public readonly id: string;

  public readonly type: 'websocket' | 'webhook';

  public readonly status: string;

  public readonly callback?: string;

  public readonly sessionId?: string;

  public readonly secret?: string;

  public constructor(conduit: Conduit, data: ConduitShardData & { transport: { secret?: string }}){
    
    this.conduit = conduit;
    
    this.id = data.id;
    
    this.type = data.transport.method;
    
    this.status = data.status;
    
    this.callback = data.transport.callback;
    
    this.sessionId = data.transport.session_id;

    this.secret = data.transport.secret;
  }

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

  public async delete(){
    return await this.conduit.deleteShard(this.id);
  }
}