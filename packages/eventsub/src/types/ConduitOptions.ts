import type { TokenAdapter } from '@twitchfy/helix';
import type { BaseConnectionOptions } from './BaseConnectionOptions';
import type { Conduit } from '../structures';

export type ConduitOptions = BaseConnectionOptions<Conduit> & {
    appToken: TokenAdapter<'app'>
    shards: string[];
    conduitCleanup?: boolean;
    conduitId?: string;
    shardCount?: number;
    dropSubsAtStart?: boolean;
    deleteConduitOnNoShards?: boolean;
}
