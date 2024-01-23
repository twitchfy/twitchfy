import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';
import { ChannelAdBreakBeginMessage } from '../structures/messages/ChannelAdBreakBegin/ChannelAdBreakBeginMessage';
import { ChannelChatClearUserMessagesMessage } from '../structures/messages/ChannelChatClearUserMessages/ChannelChatClearUserMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export interface SubscriptionMessages {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginMessage
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesMessage
}