import { ConnectionTypes } from './ConnectionTypes';
import { ChannelChatClearUserMessagesMessage } from '../structures/messages/ChannelChatClearUserMessages/ChannelChatClearUserMessages';
import { ChannelAdBreakBeginMessage } from '../structures/messages/ChannelAdBreakBegin/ChannelAdBreakBeginMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';

export type SubscriptionMessage<K extends ConnectionTypes = ConnectionTypes> = ChannelFollowMessage<K> | ChannelUpdateMessage<K> | ChannelChatClearMessage<K> | StreamOnlineMessage<K> | ChannelAdBreakBeginMessage<K> | ChannelChatClearUserMessagesMessage<K>