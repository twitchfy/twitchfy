import type { WebhookConnection, WebhookSubscription, WebSocketSubscription } from '@twitchfy/eventsub';
import { SubscriptionTypes } from '@twitchfy/eventsub';
import { handleOnMessage } from './handleOnMessage';
import { getSubscriptonKey } from './handleEvent';
import type { ChatBot } from '../structures';
import { ChannelProfile } from '../structures';
import type { EventSubConnection } from '../enums';
import type { ChannelEvents } from '../types';

/**
 * Handle the subscription reload.
 * @param this The current instance of the chatbot.
 * @param subscription The subscription to reload.
 * @internal
 */
export function handleSubscriptionReload<T extends EventSubConnection>(this: ChatBot<T>, subscription: T extends WebhookConnection ? WebhookSubscription<SubscriptionTypes> : WebSocketSubscription<SubscriptionTypes>) {

  let profile = this.profiles.get(subscription.options.broadcaster_user_id);

  if(!profile){
    profile = new ChannelProfile<T>(this, { id: subscription.options.broadcaster_user_id, events: ['ChannelChatMessage'] });
    this.profiles.set(subscription.options.broadcaster_user_id, profile);
  }

  if (subscription.checkSubscriptionType(SubscriptionTypes.ChannelChatMessage) && subscription.options.user_id === this.userId) {

    const fn = handleOnMessage.bind(this);

    subscription.onMessage(fn);

    return;
    
  }

  initEvent(profile, subscription.type);

}

export function initEvent<T extends EventSubConnection>(profile: ChannelProfile<T>, type: SubscriptionTypes){

  const key = getSubscriptonKey(type) as ChannelEvents;

  if (!key) return;

  profile.events.push(key);
}