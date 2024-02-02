import type { Channel } from '../Channel';
import type { ChatBot } from '../../ChatBot';
import { AutoModSettings } from '../AutoModSettings';

/**
 * @class
 * Represents the AutoModSettingsManager of a channel.
 */
export class AutoModSettingsManager{

  /**
    * @description The current instance of the {@link ChatBot}.
    */
  public chatbot: ChatBot;

  /**
    * @description The AutoMod's {@link Channel}.
    */
  public channel: Channel;

  /**
    * 
    * @param chatbot 
    * @param channel 
    */
  public constructor(chatbot: ChatBot, channel: Channel){
    this.chatbot = chatbot;
    this.channel = channel;
  }

  /**
    * Obtain the current settings of the channel's automod.
    * @returns {Promise<AutoModSettings>} Returns the current channel's automod settings.
    */
   
  public async fetch(){
    return new AutoModSettings(this.chatbot, await this.chatbot.helixClient.getAutoModSettings(this.channel.id, this.chatbot.user.id), this.channel);
  }
}
