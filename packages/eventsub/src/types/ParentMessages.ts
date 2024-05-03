/**
 * The types of messages received by the shard from the parent process.
 */
export type ParentMessages = ShardIdReplace

/**
 * Message emitted when there is a need to replace the id of a shard.
 */
export interface ShardIdReplace {
    topic: 'shardId.replace',
    shardId: string
}