import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { ChannelUpdateOptions } from './options/ChannelUpdateOptions';
import { ChannelFollowOptions } from './options/ChannelFollowOptions';
import { ChannelChatClearOptions } from './options/ChannelChatClearOptions';
import { StreamOnlineOptions } from './options/StreamOnlineOptions';

export interface SubscriptionOptions {
    [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
    [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
    [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
}