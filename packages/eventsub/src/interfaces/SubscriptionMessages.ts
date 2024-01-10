import { ChannelUpdateMessage } from '../structures/messages/ChannelUpdate/ChannelUpdateMessage';
import { ChannelFollowMessage } from '../structures/messages/ChannelFollow/ChannelFollowMessage';
import { ChannelChatClearMessage } from '../structures/messages/ChannelChatClear/ChannelChatClearMessage';
import { StreamOnlineMessage } from '../structures/messages/StreamOnline/StreamOnlineMessage';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';

export interface SubscriptionMessages {
    [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage
    [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage
    [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage
    [SubscriptionTypes.StreamOnline]: StreamOnlineMessage
}