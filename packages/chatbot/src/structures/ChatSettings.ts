import type { ChatBot } from '../ChatBot';
import type { Channel } from './Channel';
import type { ChatSettingsOptions } from '../interfaces/ChatSettingsOptions';
import { ChatSettingsBody } from '@twitchapi/helix';
import type { ChatSettings as ChatSettingsResponse } from '@twitchapi/api-types';

/**
 * Represents the chat settings of a channel.
 * @class
 */

export class ChatSettings{

  /** 
    * @description The current instance of the {@link ChatBot}
    */
  public chatbot: ChatBot;

  /**
     * @description The {@link Channel} whose settings are.
     */
  public channel: Channel;

  /**
     * @description A boolean that determines if the emotesOnly mode is enabled.
     */
  public emotesOnly: boolean;

  /**
     * /**
     * @description A boolean that determines if the followersOnly mode is enabled.
     */
  public followersOnly: boolean;

  /**
     * @description The number in minutes the followers have to be following the broadcaster to be able to talk if the followersOnly mode is enabled. If the followersOnly mode is not enabled this will be null.
     */
  public followersOnlyDuration: number | null;

  /**
     * @description A boolean that determines if the chatDelay is enabled.
     */
  public chatDelay: boolean;

  /**
     * @description The numner in seconds the messages are delayed for the non-moderators. If the chatDelay mode is not enabled this value will be null.
     */
  public chatDelayDuration: number | null;

  /**
     * @description A boolean that determines if the slowMode is enabled.
     */
  public slowMode: boolean;

  /**
     * @description The number in seconds the normal chatters have to wait to send another message. If the slowMode is not enabled this value will be null.
     */
  public slowModeWaitTime: number | null;

  /**
     * @description A boolean that determines if the subscriber mode is enabled.
     */
  public subsOnly: boolean;

  /**
     * @description A boolean that determines if the unique messages mode is enabled.
     */
  public uniqueMessagesOnly: boolean;

  /**
     * 
     * @param chatbot
     * @param data
     * @param channel 
     */
  public constructor(chatbot: ChatBot, data: ChatSettingsResponse, channel: Channel){
    this.chatbot = chatbot;
    this.channel = channel;
    this.emotesOnly = data.emote_mode;
    this.followersOnly = data.follower_mode;
    this.followersOnlyDuration = data.follower_mode_duration;
    this.chatDelay = data.non_moderator_chat_delay;
    this.chatDelayDuration = data.non_moderator_chat_delay_duration;
    this.slowMode = data.slow_mode;
    this.slowModeWaitTime = data.slow_mode_wait_time;
    this.subsOnly = data.subscriber_mode;
    this.uniqueMessagesOnly = data.unique_chat_mode;
  }

  /**
     * Set all the chat settings options.
     * @param {ChatSettingsOptions} options The options of the new chat settings.
     * @returns {Promise<ChatSettings>} The new channel's {@link ChatSettings}
     */

  public async set(options: ChatSettingsOptions){

    const body = new ChatSettingsBody({ ...this, ...options});

    return new ChatSettings(this.chatbot, await this.chatbot.helixClient.updateChatSettings(this.channel.id, this.chatbot.user.id, body), this.channel);
  }

}