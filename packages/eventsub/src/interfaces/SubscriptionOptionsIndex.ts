import type { ConnectionTypes, SubscriptionOptions } from '../types';
import type { SubscriptionTypes } from '../enums';


export interface SubscriptionOptionsIndex<K extends ConnectionTypes> {
    [SubscriptionTypes.ChannelChatClear]: SubscriptionOptions<SubscriptionTypes.ChannelChatClear, K>
    [SubscriptionTypes.ChannelUpdate]: SubscriptionOptions<SubscriptionTypes.ChannelUpdate, K>
    [SubscriptionTypes.ChannelFollow]: SubscriptionOptions<SubscriptionTypes.ChannelFollow, K>
    [SubscriptionTypes.StreamOnline]: SubscriptionOptions<SubscriptionTypes.StreamOnline, K>
    [SubscriptionTypes.ChannelAdBreakBegin]: SubscriptionOptions<SubscriptionTypes.ChannelAdBreakBegin, K>
    [SubscriptionTypes.ChannelChatClearUserMessages]: SubscriptionOptions<SubscriptionTypes.ChannelChatClearUserMessages, K>
}