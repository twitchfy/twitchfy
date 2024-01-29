import { ChannelUpdateMessage, ChannelFollowMessage, ChannelChatClearMessage, StreamOnlineMessage, ChannelAdBreakBeginMessage, ChannelChatClearUserMessagesMessage } from '../structures';
import { SubscriptionTypes } from '../enums';
import { ConnectionTypes } from '../types';

export interface SubscriptionMessages<K extends ConnectionTypes = ConnectionTypes> {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage<K>
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage<K>
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage<K>
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage<K>
    [SubscriptionTypes.ChannelAdBreakBegin]: ChannelAdBreakBeginMessage<K>
    [SubscriptionTypes.ChannelChatClearUserMessages]: ChannelChatClearUserMessagesMessage<K>
}