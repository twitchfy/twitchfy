import type { Conduit, Shard } from '../structures';
import type { EventSubEvents } from './EventSubEvents';

/**
 * The specific events for a Conduit.
 */
export interface ConduitEvents extends EventSubEvents<Conduit> { 
    /**
     * Emitted when a shard connects to the Conduit and all the verifications have been passed.
     */
    shardConnect: [conduit: Conduit, shard: Shard]
}