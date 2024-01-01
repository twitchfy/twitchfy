import { ChatBot } from '../ChatBot';
import { WhisperBody } from '@twitchapi/helix';
import { User } from './User';

/**
 * Represents any user that is involved in a ban. This user can be the broadcaster, the banned user or the moderator who ban the user.
 */
export class BanUser{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The user's id.
     */
  public id: string;
    
  /**
     * 
     * @param chatbot 
     * @param id 
     */
  public constructor(chatbot: ChatBot, id: string){

    this.chatbot = chatbot;
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
  public async fetch(): Promise<User>{

    return await this.chatbot.users.fetch(this.id);
  }
}