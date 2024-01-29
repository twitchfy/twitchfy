import { ChannelUpdateOptions, ChannelFollowOptions, ChannelChatClearOptions, StreamOnlineOptions, ChannelAdBreakBeginOptions, ChannelChatClearUserMessagesOptions } from '.';
import { SubscriptionTypes } from '../enums';

export interface SubscriptionTypeOptions {
    [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
    [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
    [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginOptions
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesOptions
}