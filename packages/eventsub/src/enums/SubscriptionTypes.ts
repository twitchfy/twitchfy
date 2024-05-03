/**
 * Types of subscriptions that can be created.
 */
export enum SubscriptionTypes {
    ChannelUpdate = 'channel.update',
    ChannelFollow = 'channel.follow',
    ChannelChatClear = 'channel.chat.clear',
    StreamOnline = 'stream.online',
    ChannelAdBreakBegin = 'channel.ad_break.begin',
    ChannelChatClearUserMessages = 'channel.chat.clear_user_messages',
    ChannelChatMessage = 'channel.chat.message'
}