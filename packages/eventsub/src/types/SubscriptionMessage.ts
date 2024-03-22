import type { ConnectionTypes } from './ConnectionTypes';
import type { ChannelChatClearUserMessagesMessage, ChannelAdBreakBeginMessage, ChannelChatClearMessage, ChannelFollowMessage, ChannelUpdateMessage, StreamOnlineMessage, ChannelChatMessageMessage } from '../structures';

export type SubscriptionMessage<K extends ConnectionTypes = ConnectionTypes> = ChannelFollowMessage<K> | ChannelUpdateMessage<K> | ChannelChatClearMessage<K> | StreamOnlineMessage<K> | ChannelAdBreakBeginMessage<K> | ChannelChatClearUserMessagesMessage<K> | ChannelChatMessageMessage<K>