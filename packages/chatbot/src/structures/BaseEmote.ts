import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';
import type { FetchEmote } from '../types';

/**
 * The base emote class.
 */
export class BaseEmote<T extends EventSubConnection, K extends EmoteType = EmoteType> extends Base<T> {

  /**
   * The id of the emote.
   */
  public readonly id: string;

  /**
   * The name of the emote.
   */
  public readonly name: string;

  /**
   * The base data of the emote.
   */
  protected data: BaseEmoteData;

  /**
   * Creates a new instance of the base emote.
   * @param chatbot The current instance of the chatbot.
   * @param data The base data of the emote.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseEmoteData) {
    super(chatbot);
    this.data = data;
    this.id = data.id;
    this.name = data.name;
  }

  /**
   * The Id of the owner of the emote.
   */
  public get ownerId(){
    return this.data.owner_id === '0' ? null : this.data.owner_id;
  }

  /**
   * The Id of the emote set.
   */
  public get setId(){
    return this.data.emote_set_id === '0' ? null : this.data.emote_set_id;
  }

  /**
   * Whether the emote is static.
   */
  public get static() {
    return this.data.format.includes('static');
  }

  /**
   * Whether the emote is animated.
   */
  public get animated() {
    return this.data.format.includes('animated');
  }

  /**
   * Check if the emote is a global Twitch emote.
   * @returns A boolean indicating whether the emote is a global Twitch emote.
   */
  public isGlobal(): this is BaseEmote<T, 'global'> {
    return this.data.owner_id === '0';
  }

  /**
   * Check if the emote is a custom channel emote.
   * @returns A boolean indicating whether the emote is a channel emote.
   */
  public isChannel(): this is BaseEmote<T, 'channel'> {
    return this.data.owner_id !== '0';
  }

  /**
   * Fetches the emote from the API.
   * @returns The fetched emote. Returns null if the emote was not found.
   */
  public async fetch(): Promise<FetchEmote<T, K> | null> {
    const { ChannelEmote } = await import('./ChannelEmote');
    const { GlobalEmote } = await import('./GlobalEmote');
    if(this.isChannel()){
      const emoteData = await this.chatbot.helixClient.getChannelEmotes(this.data.owner_id);
      const emote = emoteData.emotes.find((x) => x.id === this.data.id);
      if(!emote) return null;
      return new ChannelEmote<T>(this.chatbot, { ...emote, template: emoteData.template, owner_id: this.data.owner_id }) as FetchEmote<T, K>;
    }else {
      const emoteData = await this.chatbot.helixClient.getGlobalEmotes();
      const emote = emoteData.emotes.find((x) => x.id === this.data.id);
      if(!emote) return null;
      return new GlobalEmote<T>(this.chatbot, { ...emote, template: emoteData.template }) as FetchEmote<T, K>;
    }
  
  }


}

/**
 * The data of the base emote.
 */
export interface BaseEmoteData {
    /**
     * The id of the emote.
     */
    id: string;
    /**
     * The id of the owner of the emote.
     */
    owner_id: string;
    /**
     * The id of the emote set.
     */
    emote_set_id: string;
    /**
     * The format of the emote.
     */
    format: ('static' | 'animated')[];
    /**
     * The name of the emote.
     */
    name: string;
}

export type EmoteType = 'global' | 'channel';


