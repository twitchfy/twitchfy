import type { SubscriptionTypes } from '@twitchfy/eventsub';

/**
 * The EventSub events which the chatbot could listen.
 */
export type ChannelEvents = keyof Pick<typeof SubscriptionTypes, 'ChannelChatClear' | 'ChannelFollow' | 'ChannelUpdate' | 'StreamOnline' | 'ChannelChatMessage' | 'StreamOffline'> 
