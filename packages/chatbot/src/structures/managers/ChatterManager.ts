import type { ChatBot } from '../../ChatBot';
import { UncompleteChatter } from '../../structures/UncompleteChatter';
import type { Channel } from '../../structures/Channel';
import type { Chat } from '../../structures/Chat';

/**
 * @class
 * Represents a ChatterManager of a channel chat.
 */

export class ChatterManager{

  /**
     * @description The current instance of the {@link ChatBot}
     */
  public chatbot: ChatBot;

  /**
     * @description The {@link Channel} of the ChatterManager.
     */
  public channel: Channel;

  /**
     * @description The {@link Chat} of the ChatterManager.
     */
  public chat: Chat;

  /**
     * 
     * @param chatbot 
     * @param chat
     */

  public constructor(chatbot: ChatBot, chat: Chat){
    this.chatbot = chatbot;
    this.chat = chat;
    this.channel = this.chat.channel;
        
  }

  /**
     * Obtain the chatters from a channel's chat. Please note that there may be a delay in Twitch updating the list of chatters.
     * @returns {Promise<UncompleteChatter[]>} Returns an array of {@link UncompleteChatter}.
     */
  public async fetch() {

    const chatters = await this.chatbot.helixClient.getChatters(this.channel.id, this.chatbot.user.id);

    return chatters.map((x) => new UncompleteChatter(this.chatbot, this.channel, x));

  }
}