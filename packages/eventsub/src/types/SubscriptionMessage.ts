import { ChannelChatClearUserMessagesMessage } from '../structures/messages/ChannelChatClearUserMessages/ChannelChatClearUserMessages';
import { ChannelAdBreakBeginMessage } from '../structures/messages/ChannelAdBreakBegin/ChannelAdBreakBeginMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';

export type SubscriptionMessage = ChannelFollowMessage | ChannelUpdateMessage | ChannelChatClearMessage | StreamOnlineMessage | ChannelAdBreakBeginMessage | ChannelChatClearUserMessagesMessage