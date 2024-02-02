import { Ban } from '../Ban';
import type { ChatBot } from '../../ChatBot';
import type { Channel } from '../../structures/Channel';
import type { BanOptions } from '../../interfaces/BanOptions';
import type { TimeoutOptions } from '../../interfaces/TimeoutOptions';
import { BanBody, TimeoutBody } from '@twitchapi/helix';



/**
 * Represents a BanManager of a channel
 * @class
 */


export class BanManager{

   
  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;


   
  /**
     * @description The {@link Channel} of the BanManager.
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
     * 
     * @param {string} userID The user's id of the user you want to ban. 
     * @param {BanOptions} options The options of the ban. 
     * @returns {Ban} Returns a {@link Ban} class that represents the ban.
     */
  public async createBan(userID: string, options?: BanOptions): Promise<Ban> {

    const body = new BanBody(userID, options?.reason);
        
    return new Ban(this.chatbot, await this.chatbot.helixClient.banUser(this.channel.id, this.chatbot.user.id, body));
  }


  public async createTimeout(userID: string, options: TimeoutOptions): Promise<Ban> {

    const body = new TimeoutBody(userID, options.duration, options.reason);

    return new Ban(this.chatbot, await this.chatbot.helixClient.timeoutUser(this.channel.id, this.chatbot.user.id, body));

  }

  /**
     * UnBan the specified user in the {@link Channel} of this BanManager.
     * @param {string} userID The userID of the person who is banned and you are going to unBan.
     */

  public async unBan(userID: string){
    await this.chatbot.helixClient.unBanUser(this.channel.id, this.chatbot.user.id, userID);
  }
}