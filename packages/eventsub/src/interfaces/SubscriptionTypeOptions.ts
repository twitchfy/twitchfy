import { ChannelUpdateOptions } from './options/ChannelUpdateOptions';
import { ChannelFollowOptions } from './options/ChannelFollowOptions';
import { ChannelChatClearOptions } from './options/ChannelChatClearOptions';
import { StreamOnlineOptions } from './options/StreamOnlineOptions';
import { ChannelAdBreakBeginOptions } from './options/ChannelAdBreakBeginOptions';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export interface SubscriptionTypeOptions {
    [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
    [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
    [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginOptions
}