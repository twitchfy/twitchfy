import { ChatSettingsBody } from '@twitchapi/helix';
import type { ChatBot } from '../ChatBot';
import type { Channel } from './Channel';
import { ChatSettings } from './ChatSettings';
import { ChatSettingsManager } from './managers/ChatSettingsManager';
import { ChatterManager } from './managers/ChatterManager';

/**
 * Represent the chat of a channel.
 * @class
 */

export class Chat {

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The {@link Channel} of the chat.
     */
  public channel: Channel;

  /**
     * @description The {@link ChatSettingsManager} of the chat.
     */
  public settings: ChatSettingsManager;

    
  /**
     * @description The {@link ChatterManager} of the chat.
     */
  public chatters: ChatterManager;

  /**
     * 
     * @param chatbot
     * @param channel
     */
  public constructor(chatbot: ChatBot, channel: Channel) {
    this.chatbot = chatbot;
    this.channel = channel;
    this.settings = new ChatSettingsManager(this.chatbot, this);
    this.chatters = new ChatterManager(this.chatbot, this);
  }

  /**
     * Set the slowMode of the Chat.
     * @param {number | null} duration The duration of the slowMode in seconds. If `duration` is null, the slowMode will be removed. 
     * @returns {Promise<ChatSettings>} The new channel's {@link ChatSettings}.
     */
  public async setSlowMode(duration: number | null): Promise<ChatSettings> {

    if (duration) {
      const body = new ChatSettingsBody({ slowMode: true, slowModeWaitTime: duration });
      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
    } else {
      const body = new ChatSettingsBody({ slowMode: false });
      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
    }
  }


  /**
     * Set the followerMode of the Chat.
     * @param {number | null} duration The duration in seconds that the followers must to be following the channel to talk. If `duration` is null, the followeMode will be removed.
     * @returns {Promise<ChatSettings>} The new channel's {@link ChatSettings}.
     */
  public async setFollowerMode(duration: number | null): Promise<ChatSettings> {
    if (duration) {
      const body = new ChatSettingsBody({ followerMode: true, followerModeDuration: duration });
      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
    } else {
      const body = new ChatSettingsBody({ followerMode: false });
      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
    }
  }

  /**
     * Set the subscriberMode of the Chat.
     * @param {boolean} query If the subscriberMode is enabled. 
     * @returns {Promise<ChatSettings>} The new channel's {@link ChatSettings}.
     */
  public async setSubscriberMode(query: boolean): Promise<ChatSettings> {
    const body = new ChatSettingsBody({ subscriberMode: query });

    return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
  }

  /**
     * Set the uniqueMessagesMode of the Chat.
     * @param {boolean} query If the uniqueMessagesMode is enabled
     * @returns {Promise<ChatSettings>} The new channel's {@link ChatSettings}.
     */
  public async setUniqueMessagesMode(query: boolean): Promise<ChatSettings> {
    const body = new ChatSettingsBody({ uniqueMessagesMode: query });

    return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);

  }

  /**
     * Set the chatDelay of the Chat.
     * @param {duration | null} delay The delay in seconds the non-moderators will have when a message is sent. If `duration` is null, the chatDelay will be removed.  
     * @returns 
     */
  public async setChatDelay(delay: number | null ) : Promise<ChatSettings> {

    if(delay){
      const body = new ChatSettingsBody({ chatDelay: true, chatDelayDuration: delay });

      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
    
    }else{
      const body = new ChatSettingsBody({ chatDelay: false });

      return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);

    }
  }


}