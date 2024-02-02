import type { Channel } from './Channel';
import type { ChatBot } from '../ChatBot';
import { AutoModSettingsManager } from './managers/AutoModSettingsManager';

/**
 * @class
 * Represents the automod of a channel.
 */
export class AutoMod{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The channel whose automod is.
     */
  public channel: Channel;

  /**
     * @description The settings of the automod.
     */
  public settings: AutoModSettingsManager;


  /**
     * 
     * @param chatbot 
     * @param channel 
     */
  public constructor(chatbot: ChatBot, channel: Channel){

    this.chatbot = chatbot;
    this.channel = channel;
    this.settings = new AutoModSettingsManager(this.chatbot, this.channel);
  }

}