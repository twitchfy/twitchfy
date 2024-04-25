/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { ChannelFollowMessage, SubscriptionType, ChannelChatClearMessage, ChannelUpdateMessage, StreamOnlineMessage, ChannelChatMessageMessage } from '@twitchfy/eventsub';
import { SubscriptionTypes, type SubscriptionMessage } from '@twitchfy/eventsub';
import { ChannelChatClear, ChannelFollow, ChannelUpdate, ChatRoom, Message, StreamOnline, type ChatBot } from '../structures';
import type { EventSubConnection } from '../enums';
import type { EventSubConnectionMap } from '../interfaces';
import type { ChannelEvents, MessageData } from '../types';

/**
 * Handle the event received from the EventSub.
 * @param this The current instance of the chatbot.
 * @param message The message received from the EventSub.
 * @param subscription The subscription received from EventSub.
 * @returns 
 * @internal
 */
export function handleEvent<T extends EventSubConnection>(this: ChatBot<T>, message: SubscriptionMessage<EventSubConnectionMap[T]>, subscription: SubscriptionType<SubscriptionTypes, EventSubConnectionMap[T]>){

  const key = getSubscriptonKey(subscription.type);

  if(!key) return;

  const event = this.events.get(key);

  if(!event) return;

  let data;

  switch(key as ChannelEvents){

  case 'ChannelFollow': data = new ChannelFollow<T>(this, message as ChannelFollowMessage<EventSubConnectionMap[T]>);

    break;

  case 'ChannelChatClear': data = new ChannelChatClear<T>(this, message as ChannelChatClearMessage<EventSubConnectionMap[T]>);

    break;

  case 'ChannelUpdate': data = new ChannelUpdate<T>(this, message as ChannelUpdateMessage<EventSubConnectionMap[T]>);

    break;

  case 'StreamOnline': data = new StreamOnline<T>(this, message as StreamOnlineMessage<EventSubConnectionMap[T]>);

    break;

  case 'ChannelChatMessage': {
    const typedMessage = message as ChannelChatMessageMessage<EventSubConnectionMap[T]>;
    data = new Message<T>(this, message as MessageData<T>, new ChatRoom(this, { broadcaster_id: typedMessage.broadcaster.id, broadcaster_login: typedMessage.broadcaster.login, broadcaster_name: typedMessage.broadcaster.displayName }));
  }

    break;

  default: return;

  }

  // @ts-expect-error
  return event.run(this, data);
}

/**
 * Get the key of the subscription type.
 * @param value The value of the subscription.
 * @returns 
 * @internal
 */
export function getSubscriptonKey(value: string): ChannelEvents | undefined{
  for (const key in SubscriptionTypes) {
    // @ts-expect-error
    if (SubscriptionTypes[key] === value) {
      return key as ChannelEvents;
    }
  }
  return undefined;
}