import type { GlobalEmote, ChannelEmote } from '@twitchapi/api-types';
import type { ChatBot } from './ChatBot';
import { BaseEmote } from './BaseEmote';
import type { EmoteURLOptions } from '../interfaces';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch emote. It could be either a global emote or a channel emote.
 */
export class Emote<T extends EventSubConnection, K extends 'global' | 'channel'> extends BaseEmote<T, K>{

  /**
   * The data of the emote returned from the API.
   */
  protected emoteData: (GlobalEmote | ChannelEmote) & { template: string, owner_id: string };

  /**
   * Creates a new instance of the emote.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the emote returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: (GlobalEmote | ChannelEmote) & { template: string, owner_id: string, emote_set_id: string}){
    super(chatbot, data);
    this.emoteData = data;
  }

  /**
   * Checks whether the emote is light theme.
   */
  public get hasLightTheme(){
    return this.emoteData.theme_mode.includes('light');
  }
    
  /**
   * Checks whether the emote is dark theme.
   */
  public get hasDarkTheme(){
    return this.emoteData.theme_mode.includes('dark');
  }
    
  /**
   * Gets the URL of the emote.
   * @param options The options to get the URL of the emote.
   * @returns Returns the URL of the emote.
   */
  public getURL(options?: EmoteURLOptions){
    return this.emoteData.template
      .replace(/{{id}}/g, this.id)
      .replace(/{{format}}/g, options?.format || 'static')
      .replace(/{{theme_mode}}/g, options?.theme || 'light')
      .replace(/{{scale}}/g, options?.scale || '1.0');
  }

}