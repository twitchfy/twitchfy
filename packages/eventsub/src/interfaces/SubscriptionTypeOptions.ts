import type { ChannelUpdateOptions, ChannelFollowOptions, ChannelChatClearOptions, StreamOnlineOptions, ChannelAdBreakBeginOptions, ChannelChatClearUserMessagesOptions } from './options';
import type { SubscriptionTypes } from '../enums';

export interface SubscriptionTypeOptions {
    [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
    [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
    [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginOptions
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesOptions
}