import type { ChannelUpdateOptions, ChannelFollowOptions, ChannelChatClearOptions, StreamOnlineOptions, ChannelAdBreakBeginOptions, ChannelChatClearUserMessagesOptions, ChannelChatMessageOptions, StreamOfflineOptions } from './options';
import type { SubscriptionTypes } from '../enums';

/**
 * The options for every subscription type.
 */
export interface SubscriptionTypeOptions {
    [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
    [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
    [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginOptions
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesOptions
    [SubscriptionTypes.ChannelChatMessage]: ChannelChatMessageOptions
    [SubscriptionTypes.StreamOffline]: StreamOfflineOptions
}