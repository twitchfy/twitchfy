import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { Warning } from '../Warning';
import type { EventSubConnection } from '../../enums';

/**
 * The warns manager of the chatbot.
 */
export class ChatBotWarnsManager<T extends EventSubConnection> extends Base<T>{
    
  /**
   * Creates a new instance of the warns manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }
    
  /**
   * Creates warn for an user in a specific chatroom.
   * @param chatroomId The id of the chatroom where the user will be warned.
   * @param userId The id of the user to warn.
   * @returns 
   */
  public async create(chatroomId: string, userId: string, reason: string){
    return new Warning(this.chatbot, await this.chatbot.helixClient.warnChatUser(chatroomId, this.chatbot.userId, { data: { user_id: userId, reason } }));
  }
}