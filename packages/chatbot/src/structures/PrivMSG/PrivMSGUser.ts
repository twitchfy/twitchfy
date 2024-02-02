import type { ChatBot } from '../../ChatBot';
import type { PrivMSGTags } from '../../interfaces/tags/PrivMSGTags';
import type { User } from '../User';
import { WhisperBody } from '@twitchapi/helix';


export class PrivMSGUser{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The id of the user.
     */
  public id: string;

  /**
     * @description The user's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */
  public displayName: string;
  /**
     * @description The type of user. If the user is null the user is a normal user.
     */
  public type: string | null;

  /**
     * 
     * @param chatbot 
     * @param tags 
     */

  public constructor(chatbot: ChatBot, tags: PrivMSGTags){
    this.chatbot = chatbot;
    this.id = tags['user-id'];
    this.displayName = tags['display-name'];
    this.type = tags['user-type'] === '' ? null : tags['user-type'];
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