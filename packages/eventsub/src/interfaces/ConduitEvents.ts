import type { Conduit, Shard } from '../structures';
import type { EventSubEvents } from './EventSubEvents';

export interface ConduitEvents extends EventSubEvents<Conduit> { 
    shardConnect: [conduit: Conduit, shard: Shard]
}