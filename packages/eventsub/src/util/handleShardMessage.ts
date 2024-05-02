/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Worker } from 'node:worker_threads';
import { StreamOnlineMessage, type Conduit, Shard, ChannelChatMessageMessage, ChannelFollowMessage, ChannelUpdateMessage, ChannelChatClearMessage, ChannelChatClearUserMessagesMessage, ChannelAdBreakBeginMessage } from '../structures';
import type { ShardMessages } from '../types';
import type { BasePayload } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import { Events } from '../enums';

export async function handleShardMessage(this: { conduit: Conduit, worker: Worker, resolve: () => void }, message: ShardMessages) {

  switch (message.topic) {
  case 'shard.webhook.start': {

    let shard = new Shard(this.conduit, message.shard);

    if(!this.conduit.shards.size && this.conduit.conduitCleanup){
      const shardData = await this.conduit.helixClient.updateConduitShards({
        conduit_id: this.conduit.id,
        shards: [{
          ...shard.toAPI(),
          id: '0'
        }]
      });

      await this.conduit.helixClient.updateConduit({
        id: this.conduit.id,
        shard_count: 1
      });

      shard = new Shard(this.conduit, shardData[0]);
    }

    this.conduit.shards.set(shard.id, shard);

    this.conduit.workers.set(shard.id, this.worker);

    this.conduit.makeDebug('Shard started with id', shard.id);

    this.conduit.emit(Events.ShardConnect, this.conduit, shard);

    this.resolve();

  }

    break;

  case 'shard.websocket.start': {
      
    let shard = new Shard(this.conduit, message.shard);

    if(!this.conduit.shards.size && this.conduit.conduitCleanup){
      const shardData = await this.conduit.helixClient.updateConduitShards({
        conduit_id: this.conduit.id,
        shards: [{
          ...shard.toAPI(),
          id: '0'
        }]
      });

      await this.conduit.helixClient.updateConduit({
        id: this.conduit.id,
        shard_count: 1
      });

      shard = new Shard(this.conduit, shardData[0]);
    }

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

  default: {

    const subscription = this.conduit.subscriptions.get(message.payload.subscription.id) || await this.conduit.storage?.get(message.payload.subscription.id);

    if(!subscription) return;

    switch(message.topic){

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

    case 'channel.chat.clear' : {

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
    }
  }
  }
        
}

function setPayloadType<T extends SubscriptionTypes>(notification: BasePayload): asserts notification is BasePayload<T> { }