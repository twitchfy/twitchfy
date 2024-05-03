/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { WebhookShard, WebSocketShard } from '../structures';
import type { ParentMessages } from '../types';

/**
 * Handles a parent message within a shard.
 *
 * @param message The message to handle.
 */
export async function handleParentMessage(this: WebhookShard | WebSocketShard, message: ParentMessages){
  switch(message.topic){
    
  case 'shardId.replace': {
    // @ts-expect-error
    this._shardId = message.shardId;
  }
  }
}