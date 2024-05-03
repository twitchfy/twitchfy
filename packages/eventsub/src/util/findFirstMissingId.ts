import type { ConduitShardData } from '@twitchfy/api-types';

/**
 * Finds the first unused or disable shard in a conduit and returns its id.
 * @param shards The id that was found.
 */
export function findFirstMissingId(shards: ConduitShardData[]) {
  shards.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (let i = 0; i < shards.length - 1; i++) {
    if (parseInt(shards[i + 1].id) - parseInt(shards[i].id) > 1) {
      return String(parseInt(shards[i].id) + 1);
    } else if (shards[i].status !== 'enabled' && shards[i].status !== 'webhook_callback_verification_pending') {
      return shards[i].id;
    }
  }
  return null;
}