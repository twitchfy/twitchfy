import { ChatBot } from '../ChatBot';
import { WhisperBody } from '@twitchapi/helix';
import { User } from './User';

/**
 * @class
 * Represents a Broadcaster
 */
export class Broadcaster{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The login name of the broadcaster.
     */
  public login: string;

  /**
     * @description The broadcaster's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */

  public displayName: string;

  /**
     * @description The broadcaster's id.
     */
  public id: string;

  
  /**
    * 
    * @param chatbot 
    * @param id 
    * @param login 
    * @param displayName 
    */
  public constructor(chatbot: ChatBot, id: string, login: string, displayName: string){
    this.chatbot = chatbot;
    this.login = login;
    this.displayName = displayName;
    this.id = id;
        
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