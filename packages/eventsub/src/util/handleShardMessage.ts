/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Worker } from 'node:worker_threads';
import { findFirstMissingId } from './findFirstMissingId';
import { StreamOnlineMessage, type Conduit, Shard, ChannelChatMessageMessage, ChannelFollowMessage, ChannelUpdateMessage, ChannelChatClearMessage, ChannelChatClearUserMessagesMessage, ChannelAdBreakBeginMessage, StreamOfflineMessage } from '../structures';
import type { ShardMessages } from '../types';
import type { BasePayload } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import { Events } from '../enums';

/**
 * Handles a shard message received by the parent process.
 *
 * @param message The message to handle.
 */
export async function handleShardMessage(this: { conduit: Conduit, worker: Worker, resolve: () => void }, message: ShardMessages) {

  switch (message.topic) {

  case 'shard.webhook.start': {

    let shard;

    if (!this.conduit.shards.size && this.conduit.conduitCleanup) {
      const shardData = await this.conduit.helixClient.updateConduitShards({
        conduit_id: this.conduit.id,
        shards: [{
          transport: {
            ...message.shard.transport,
            method: 'webhook'
          },
          id: '0',
        }]
      });

      await this.conduit.helixClient.updateConduit({
        id: this.conduit.id,
        shard_count: 1
      });

      shard = new Shard(this.conduit, shardData[0]);
    } else {
      const shards = await this.conduit.helixClient.getConduitShards(this.conduit.id);
      const foundedShard = shards.find((shard) => shard.transport.method === 'webhook' && shard.transport.callback === message.shard.transport.callback);
      if (foundedShard) {
        await this.conduit.helixClient.updateConduitShards({
          conduit_id: this.conduit.id,
          shards: [{
            ...foundedShard,
            transport: {
              ...foundedShard.transport,
              secret: message.shard.transport.secret,
              method: 'webhook',
            }
          }]
        });
        shard = new Shard(this.conduit, foundedShard);
      } else {
        const id = findFirstMissingId(shards);
        if (!id) await this.conduit.helixClient.updateConduit({ id: this.conduit.id, shard_count: shards.length + 1 });
        const shardData = await this.conduit.helixClient.updateConduitShards({
          conduit_id: this.conduit.id,
          shards: [{
            transport: {
              ...message.shard.transport,
              method: 'webhook'
            },
            id: id || shards.length.toString()
          }]
        });
        shard = new Shard(this.conduit, shardData[0]);
      }
    }

    this.worker.postMessage({ topic: 'shardId.replace', shardId: shard.id });

    this.conduit.shards.set(shard.id, shard);

    this.conduit.workers.set(shard.id, this.worker);


  }

    break;

  case 'shard.websocket.start': {

    let shard;

    if (!this.conduit.shards.size && this.conduit.conduitCleanup) {
      const shardData = await this.conduit.helixClient.updateConduitShards({
        conduit_id: this.conduit.id,
        shards: [{
          transport: {
            ...message.shard.transport,
            method: 'websocket'
          },
          id: '0',
        }]
      });

      await this.conduit.helixClient.updateConduit({
        id: this.conduit.id,
        shard_count: 1
      });

      shard = new Shard(this.conduit, shardData[0]);
    } else {
      const shards = await this.conduit.helixClient.getConduitShards(this.conduit.id);
      const id = findFirstMissingId(shards);
      if (!id) await this.conduit.helixClient.updateConduit({ id: this.conduit.id, shard_count: shards.length + 1 });
      const shardData = await this.conduit.helixClient.updateConduitShards({
        conduit_id: this.conduit.id,
        shards: [{
          transport: {
            ...message.shard.transport,
            method: 'websocket'
          },
          id: id || shards.length.toString()
        }]
      });
      shard = new Shard(this.conduit, shardData[0]);
    }

    this.worker.postMessage({ topic: 'shardId.replace', shardId: shard.id });

    this.conduit.shards.set(shard.id, shard);

    this.conduit.workers.set(shard.id, this.worker);

    this.conduit.makeDebug('Shard started with id', shard.id);

    this.conduit.emit(Events.ShardConnect, this.conduit, shard);

    this.resolve();

  }

    break;

  case 'debug': {
    this.conduit.makeDebug(...message.args);
  }

    break;

  case 'warn': {
    this.conduit.makeWarn(...message.args);
  }

    break;

  case 'webhook.callback.verified': {

    const shard = this.conduit.shards.get(message.shardId);

    this.conduit.makeDebug('Shard started with id', shard.id);

    this.conduit.emit(Events.ShardConnect, this.conduit, shard);

    this.resolve();
  }

    break;

  default: {

    const subscription = this.conduit.subscriptions.get(message.payload.subscription.id) || await this.conduit.storage?.get(message.payload.subscription.id);

    if (!subscription) return;

    switch (message.topic) {

    case 'stream.online': {

      setPayloadType<SubscriptionTypes.StreamOnline>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.StreamOnline>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new StreamOnlineMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.chat.message': {

      setPayloadType<SubscriptionTypes.ChannelChatMessage>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelChatMessage>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelChatMessageMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.follow': {

      setPayloadType<SubscriptionTypes.ChannelFollow>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelFollow>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelFollowMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.update': {

      setPayloadType<SubscriptionTypes.ChannelUpdate>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelUpdate>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelUpdateMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.chat.clear': {

      setPayloadType<SubscriptionTypes.ChannelChatClear>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelChatClear>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelChatClearMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.chat.clear_user_messages': {

      setPayloadType<SubscriptionTypes.ChannelChatClearUserMessages>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelChatClearUserMessages>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelChatClearUserMessagesMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'channel.ad_break.begin': {

      setPayloadType<SubscriptionTypes.ChannelAdBreakBegin>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.ChannelAdBreakBegin>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new ChannelAdBreakBeginMessage(this.conduit, subscription, message.payload.event));
    }

      break;

    case 'stream.offline': {

      setPayloadType<SubscriptionTypes.StreamOffline>(message.payload);

      const subscription = this.conduit.subscriptions.get<SubscriptionTypes.StreamOffline>(message.payload.subscription.id);

      if (!subscription) return;

      subscription.callbacks.execute(new StreamOfflineMessage(this.conduit, subscription, message.payload.event));
    }

      break;
    }
  }
  }
}


function setPayloadType<T extends SubscriptionTypes>(notification: BasePayload): asserts notification is BasePayload<T> { }