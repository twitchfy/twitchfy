import type { TokenAdapter } from '@twitchfy/helix';
import type { BaseConnectionOptions } from './BaseConnectionOptions';
import type { Conduit } from '../structures';

/**
 * The options for building a Conduit connection.
 */
export type ConduitOptions = BaseConnectionOptions<Conduit> & {
    /**
     * The token adapter for the application token.
     */
    appToken: TokenAdapter<'app'>
    /**
     * The shard paths that will be used for establishing the shards at the start.
     */
    shards: string[];
    /**
     * Whether to cleanup the conduit when it is closed deleting replacing all the shards.
     */
    conduitCleanup?: boolean;
    /**
     * The id of the conduit. If not present, a conduit will be created.
     */
    conduitId?: string;
    /**
     * Whether to drop the subscriptions at the start.
     */
    dropSubsAtStart?: boolean;
    /**
     * Whether to delete the conduit when you are going to delete the last shard.
     */
    deleteConduitOnNoShards?: boolean;
}
