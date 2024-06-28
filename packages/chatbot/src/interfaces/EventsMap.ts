import type { ChannelFollow, ChannelChatClear, ChannelUpdate, StreamOnline, Message, StreamOffline } from '../structures';
import type { EventSubConnection } from '../enums';

/**
 * The data received by each event.
 * @internal
 */
export interface EventsMap<T extends EventSubConnection> {
    ['ChannelFollow']: ChannelFollow<T>
    ['ChannelChatClear']: ChannelChatClear<T>
    ['ChannelUpdate']: ChannelUpdate<T>
    ['StreamOnline']: StreamOnline<T>
    ['ChannelChatMessage']: Message<T>;
    ['StreamOffline']: StreamOffline<T>;
    ['ChatBotReady']: never;
}