import type { GlobalEmote as GlobalEmoteData } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import { Emote } from './Emote';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch global emote.
 */
export class GlobalEmote<T extends EventSubConnection> extends Emote<T, 'global'>{

  /**
   * Creates a new instance of the global emote.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the global emote returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: GlobalEmoteData & { template: string }){
    super(chatbot, { ...data, owner_id: '0', emote_set_id: '0' });
  }

  /**
   * Overrides isChannel method from BaseEmote to assert this as ChannelEmote and not BaseEmote.
   * @returns Whether the emote is a global emote.
   */
  public override isGlobal(): this is GlobalEmote<T> {
    return true;
  }
}