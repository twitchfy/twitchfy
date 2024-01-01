import { ChatBot } from '../ChatBot';
import { Chatter } from '@twitchapi/api-types';
import { WhisperBody } from '@twitchapi/helix';
import { User } from './User';

/**
 * @class
 * Represents the user of the UncompleteChatter
 */
export class UncompleteChatterUser{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The login name of the user.
     */
  public login: string;

  /**
     * @description The user's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */

  public displayName: string;

  /**
     * @description The user's id.
     */
  public id: string;

  /**
     * 
     * @param chatbot 
     * @param data 
     */
  public constructor(chatbot: ChatBot, data: Chatter){
    this.chatbot = chatbot;
    this.login = data.user_login;
    this.displayName = data.user_name;
    this.id = data.user_id;
        
  }

  /**
     * Send a whisper to this user.
     * @param {string} message The message you want to send to the user. You have to have the scope user:manage:whispers and the sender user has to have a verified phone number. 
     */
  public async sendWhisper(message: string){

    const whisperBody = new WhisperBody(message);

    await this.chatbot.helixClient.sendWhisper(this.chatbot.user.id, this.id, whisperBody);
  }

  /**
     * Get the whole {@link User} object with all the user's information.
     * @returns {Promise<User>} The {@link User} of this user.
     */
  public async fetch() : Promise<User> {
    return await this.chatbot.users.fetch(this.id);
  }


}