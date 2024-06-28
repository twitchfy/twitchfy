import type { ChannelUpdateMessage, ChannelFollowMessage, ChannelChatClearMessage, StreamOnlineMessage, ChannelAdBreakBeginMessage, ChannelChatClearUserMessagesMessage, ChannelChatMessageMessage, StreamOfflineMessage } from '../structures';
import type { SubscriptionTypes } from '../enums';
import type { ConnectionTypes } from '../types';

/**
 * The messages from every EventSub event.
 */
export interface SubscriptionMessages<K extends ConnectionTypes = ConnectionTypes> {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage<K>
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage<K>
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage<K>
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage<K>
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginMessage<K>
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesMessage<K>
    [SubscriptionTypes.ChannelChatMessage]: ChannelChatMessageMessage<K>
    [SubscriptionTypes.StreamOffline]: StreamOfflineMessage<K>
}