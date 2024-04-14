import type { EventSubConnection } from '../enums';
import type { GlobalEmote, ChannelEmote } from '../structures';

/**
 * The returned value when fetching an emote.
 */
export type FetchEmote<T extends EventSubConnection, K extends 'global' | 'channel'> = K extends 'global' ? GlobalEmote<T> : K extends 'channel'? ChannelEmote<T> : GlobalEmote<T> | ChannelEmote<T>;