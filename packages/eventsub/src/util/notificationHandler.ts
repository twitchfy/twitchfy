import { EventSubConnection } from '../structures/EventSubConnection';
import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';
import { ChannelAdBreakBeginMessage } from '../structures/messages/ChannelAdBreakBegin/ChannelAdBreakBeginMessage';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { BaseNotification } from '../interfaces/messages/Notification/BaseNotification';

export function notificationHandler(connection: EventSubConnection, notification: BaseNotification){


  switch(notification.payload.subscription.type){

  case SubscriptionTypes.ChannelFollow : {
   
    setNotificationType<SubscriptionTypes.ChannelFollow>(notification);

    const payload = notification.payload;

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelFollow>(payload.subscription.id);

    if(!subscription) return;

    subscription.callbacks.execute(new ChannelFollowMessage(connection, subscription, payload.event));
    
  }

    break;

  case SubscriptionTypes.ChannelUpdate : {

    setNotificationType<SubscriptionTypes.ChannelUpdate>(notification);

    const payload = notification.payload;

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelUpdate>(payload.subscription.id);

    if(!subscription) return;

    subscription.callbacks.execute(new ChannelUpdateMessage(connection, subscription, payload.event));

  }

    break;

  case SubscriptionTypes.ChannelChatClear : {

    setNotificationType<SubscriptionTypes.ChannelChatClear>(notification);

    const payload = notification.payload;

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelChatClear>(payload.subscription.id);

    if(!subscription) return;

    subscription.callbacks.execute(new ChannelChatClearMessage(connection, subscription, payload.event));
  }

    break;

  case SubscriptionTypes.StreamOnline : {

    setNotificationType<SubscriptionTypes.StreamOnline>(notification);

    const payload = notification.payload;

    const subscription = connection.subscriptions.get<SubscriptionTypes.StreamOnline>(payload.subscription.id);

    if(!subscription) return;

    subscription.callbacks.execute(new StreamOnlineMessage(connection, subscription, payload.event));
  }

    break;

  case SubscriptionTypes.ChannelAdBreakBegin : {

    setNotificationType<SubscriptionTypes.ChannelAdBreakBegin>(notification);

    const payload = notification.payload;

    const subscription = connection.subscriptions.get<SubscriptionTypes.ChannelAdBreakBegin>(payload.subscription.id);

    if(!subscription) return;

    subscription.callbacks.execute(new ChannelAdBreakBeginMessage(connection, subscription, payload.event));

  }

  }

}

function setNotificationType<T extends SubscriptionTypes>(notification: BaseNotification): asserts notification is BaseNotification<T> {}