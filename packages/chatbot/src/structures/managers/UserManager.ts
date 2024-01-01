import { User } from '../../structures/User';
import { ChatBot } from '../../ChatBot';


/**
 * Represent the UserManager of the ChatBot
 * @class
 */

export class UserManager{


  /**
     * @description The current instance of the {@link ChatBot}.
     */
    
  public chatbot: ChatBot;

  /**
     * 
     * @param chatbot
     */

  public constructor(chatbot: ChatBot){
        
    this.chatbot = chatbot;
  }

  /**
     * Use to get Twitch user information.
     * @param {string} userIdentificator The fetched user's name or id.
     * @returns {Promise<User>} Returns {@link User}.
     */
  public async fetch(userIdentificator: string): Promise<User> {
    return new User(this.chatbot, await this.chatbot.helixClient.getUser(userIdentificator));
  }
}