export type ParentMessages = ShardIdReplace

export interface ShardIdReplace {
    topic: 'shardId.replace',
    shardId: string
}