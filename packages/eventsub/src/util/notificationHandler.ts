/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChannelUpdateMessage, ChannelFollowMessage, ChannelChatClearMessage, StreamOnlineMessage, ChannelAdBreakBeginMessage, ChannelChatClearUserMessagesMessage, ChannelChatMessageMessage } from '../structures';
import { SubscriptionTypes } from '../enums';
import type { BasePayload } from '../interfaces';
import type { WebhookConnection } from '../webhook';
import type { WebSocketConnection } from '../ws';

export async function notificationHandler(connection: WebhookConnection | WebSocketConnection, payload: BasePayload<SubscriptionTypes>){

  switch(payload.subscription.type){

  case SubscriptionTypes.ChannelFollow : {
   
    setPayloadType<SubscriptionTypes.ChannelFollow>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelFollow>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new ChannelFollowMessage(connection, subscription, payload.event));
    
  }

    break;

  case SubscriptionTypes.ChannelUpdate : {

    setPayloadType<SubscriptionTypes.ChannelUpdate>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelUpdate>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new ChannelUpdateMessage(connection, subscription, payload.event));

  }

    break;

  case SubscriptionTypes.ChannelChatClear : {

    setPayloadType<SubscriptionTypes.ChannelChatClear>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelChatClear>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new ChannelChatClearMessage(connection, subscription, payload.event));
  }

    break;

  case SubscriptionTypes.StreamOnline : {

    setPayloadType<SubscriptionTypes.StreamOnline>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.StreamOnline>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new StreamOnlineMessage(connection, subscription, payload.event));
  }

    break;

  case SubscriptionTypes.ChannelAdBreakBegin : {

    setPayloadType<SubscriptionTypes.ChannelAdBreakBegin>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelAdBreakBegin>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new ChannelAdBreakBeginMessage(connection, subscription, payload.event));

  }

    break;

  case SubscriptionTypes.ChannelChatClearUserMessages : {

    setPayloadType<SubscriptionTypes.ChannelChatClearUserMessages>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelChatClearUserMessages>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error

    await subscription.callbacks.execute(new ChannelChatClearUserMessagesMessage(connection, subscription, payload.event));
  }

    break;

  case SubscriptionTypes.ChannelChatMessage : {

    setPayloadType<SubscriptionTypes.ChannelChatMessage>(payload);

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelChatMessage>(payload.subscription.id);

    if(!subscription) return;

    //@ts-expect-error
    
    await subscription.callbacks.execute(new ChannelChatMessageMessage(connection, subscription, payload.event));
  }

  }

}

function setPayloadType<T extends SubscriptionTypes>(notification: BasePayload): asserts notification is BasePayload<T> {}

