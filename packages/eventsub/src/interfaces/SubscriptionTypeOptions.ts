import type { ChannelUpdateOptions, ChannelFollowOptions, ChannelChatClearOptions, StreamOnlineOptions, ChannelAdBreakBeginOptions, ChannelChatClearUserMessagesOptions, ChannelChatMessage } from './options';
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
    [SubscriptionTypes.ChannelChatMessage]: ChannelChatMessage
}