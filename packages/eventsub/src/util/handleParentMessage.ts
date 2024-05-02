/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { WebhookConduit, WebSocketConduit } from '../structures';
import type { ParentMessages } from '../types';

export async function handleParentMessage(this: WebhookConduit | WebSocketConduit, message: ParentMessages){
  switch(message.topic){
    
  case 'shardId.replace': {
    // @ts-expect-error
    this._shardId = message.shardId;
  }
  }
}