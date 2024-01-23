import { SubscriptionOptions } from './SubscriptionOptions';
import { SubscriptionTypes } from '../enums/SubscriptionTypes';


export interface SubscriptionOptionsIndex {
    [SubscriptionTypes.ChannelChatClear]: SubscriptionOptions<SubscriptionTypes.ChannelChatClear>
    [SubscriptionTypes.ChannelUpdate]: SubscriptionOptions<SubscriptionTypes.ChannelUpdate>
    [SubscriptionTypes.ChannelFollow]: SubscriptionOptions<SubscriptionTypes.ChannelFollow>
    [SubscriptionTypes.StreamOnline]: SubscriptionOptions<SubscriptionTypes.StreamOnline>
    [SubscriptionTypes.ChannelAdBreakBegin]: SubscriptionOptions<SubscriptionTypes.ChannelAdBreakBegin>
    [SubscriptionTypes.ChannelChatClearUserMessages]: SubscriptionOptions<SubscriptionTypes.ChannelChatClearUserMessages>
}