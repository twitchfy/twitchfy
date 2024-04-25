import type { User as UserData } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import { User } from './User';
import type { EventSubConnection } from 'enums';

/**
 * Represents a Twitch chatbot user.
 */
export class ChatBotUser<T extends EventSubConnection> extends User<T> {

  /**
   * Creates a new instance of the chatbot user.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the user returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: UserData){
    super(chatbot, data);
  }

  /**
   * Sets the name color of the chatbot user which will be visible in the chat.
   * @param color The color of the name. This can be a hex color code or a color name.
   * @returns 
   */
  public async setNameColor(color: string){
    return await this.chatbot.helixClient.updateUserColor(this.id, color);
  }
}