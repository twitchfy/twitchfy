import type { UpdateConduitShards, UpdateConduitShardsOptions } from '../interfaces';

export class UpdateConduitShardsBody {

  public conduit_id: string;
  public shards: UpdateConduitShards[];

  public constructor(data: UpdateConduitShardsOptions){
    
    this.conduit_id = data.conduitId;
    this.shards = data.shards;
    
  }

}