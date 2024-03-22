import type { ChannelFollowEvent } from './ChannelFollow/ChannelFollowEvent';
import type { ChannelUpdateEvent } from './ChannelUpdate/ChannelUpdateEvent';
import type { ChannelChatClearEvent } from './ChannelChatClear/ChannelChatClearEvent';
import type { StreamOnlineEvent } from './StreamOnline/StreamOnlineEvent';
import type { ChannelAdBreakBeginEvent } from './ChannelAdBreakBegin/ChannelAdBreakBeginEvent';
import type { ChannelChatClearUserMessagesEvent } from './ChannelChatClearUserMessages/ChannelChatClearUserMessagesEvent';
import type { ChannelChatMessageEvent } from './ChannelChatMessage/ChannelChatMessageEvent';
import type { SubscriptionTypes } from '../../../../enums';

export interface SubscriptionEvents {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowEvent;
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateEvent;
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearEvent;
    [SubscriptionTypes.StreamOnline]: StreamOnlineEvent;
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginEvent;
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesEvent
    [SubscriptionTypes.ChannelChatMessage]: ChannelChatMessageEvent
}