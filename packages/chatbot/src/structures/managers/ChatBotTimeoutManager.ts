import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { Ban } from '../Ban';
import type { EventSubConnection } from '../../enums';
import type { TimeoutOptions } from '../../interfaces';

/**
 * The timeout manager of the chatbot.
 */
export class ChatBotTimeoutManager<T extends EventSubConnection> extends Base<T>{
  
  /**
   * Creates a new instance of the timeout manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }

  /**
   * Timeout a specific user.
   * @param chatroomID The id of the chatroom where the user will be sent into a timeout.
   * @param options The options required for send an user into a timeout. See {@link Timeout}.
   * @returns A class representation of the timeout. See {@link Ban}. 
   */
  public async add(chatroomID: string, options: TimeoutOptions){
    new Ban(this.chatbot, await this.chatbot.helixClient.banUser(chatroomID, this.chatbot.userID, { data: { user_id: options.userID, ...options } }));
  }

  /**
   * Deletes the timeout of a specific user.
   * @param chatroomID The id of the chatroom where the user will be removed from the timeout.
   * @param userID The id of the user to remove from the timeout.
   * @returns 
   */
  public async delete(chatroomID: string, userID: string){
    return await this.chatbot.helixClient.unBanUser(chatroomID, this.chatbot.userID, userID);
  }

}
