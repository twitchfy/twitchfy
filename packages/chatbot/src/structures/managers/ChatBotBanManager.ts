import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { Ban } from '../Ban';
import type { EventSubConnection } from '../../enums';
import type { BanOptions } from '../../interfaces';

/**
 * The ban manager of the chatbot.
 */
export class ChatBotBanManager<T extends EventSubConnection> extends Base<T>{
  
  /**
   * Creates a new instance of the ban manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }

  /**
   * Ban a specific user.
   * @param chatroomID The id of the chatroom where the user will be banned.
   * @param options The options required for banning an user. See {@link BanOptions}.
   * @returns A class representation of the ban. See {@link Ban}. 
   */
  public async add(chatroomID: string, options: BanOptions){
    return new Ban(this.chatbot, await this.chatbot.helixClient.banUser(chatroomID, this.chatbot.userID, { data: { user_id: options.userID, ...options } }));
  }

  /**
   * Deletes the ban of a specific user.
   * @param chatroomID The id of the chatroom where the user will be unbanned.
   * @param userID The id of the user to unban.
   * @returns 
   */
  public async delete(chatroomID: string, userID: string){
    return await this.chatbot.helixClient.unBanUser(chatroomID, this.chatbot.userID, userID);
  }
}
