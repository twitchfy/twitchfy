import type { ChannelUpdateMessage, ChannelFollowMessage, ChannelChatClearMessage, StreamOnlineMessage, ChannelAdBreakBeginMessage, ChannelChatClearUserMessagesMessage } from '../structures';
import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes } from '../types';

export interface SubscriptionMessages<K extends ConnectionTypes = ConnectionTypes> {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage<K>
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage<K>
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage<K>
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage<K>
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginMessage<K>
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesMessage<K>
}