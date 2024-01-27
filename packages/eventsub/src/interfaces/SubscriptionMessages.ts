import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';
import { ChannelAdBreakBeginMessage } from '../structures/messages/ChannelAdBreakBegin/ChannelAdBreakBeginMessage';
import { ChannelChatClearUserMessagesMessage } from '../structures/messages/ChannelChatClearUserMessages/ChannelChatClearUserMessages';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';
import { ConnectionTypes } from '../types/ConnectionTypes';

export interface SubscriptionMessages<K extends ConnectionTypes = ConnectionTypes> {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage<K>
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage<K>
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage<K>
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage<K>
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginMessage<K>
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesMessage<K>
}