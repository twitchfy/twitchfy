import { ChannelUpdateEvent } from './ChannelUpdate/ChannelUpdateEvent';
import { ChannelFollowEvent } from './ChannelFollow/ChannelFollowEvent';
import { ChannelChatClearEvent } from './ChannelChatClear/ChannelChatClearEvent';
import { StreamOnlineEvent } from './StreamOnline/StreamOnlineEvent';
import { SubscriptionTypes } from '../../../../enums/SubscriptionTypes';

export interface SubscriptionEvents {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowEvent;
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateEvent;
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearEvent
    [SubscriptionTypes.StreamOnline]: StreamOnlineEvent
}