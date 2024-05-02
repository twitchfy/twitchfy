import type { UpdateConduitOptions } from '../interfaces';

export class UpdateConduitBody {
  public id: string;
  public shard_count: number;

  public constructor(data: UpdateConduitOptions){
    this.id = data.conduitId;
    this.shard_count = data.shardCount;
  }
}