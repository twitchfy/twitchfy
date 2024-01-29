import { ChannelUpdateEvent, ChannelFollowEvent, ChannelChatClearEvent, ChannelAdBreakBeginEvent, ChannelChatClearUserMessagesEvent, StreamOnlineEvent } from '.';
import { SubscriptionTypes } from '../../../../enums';

export interface SubscriptionEvents {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowEvent;
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateEvent;
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearEvent;
    [SubscriptionTypes.StreamOnline]: StreamOnlineEvent;
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginEvent;
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesEvent
}