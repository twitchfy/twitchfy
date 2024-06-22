import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { Warning } from '../Warning';
import type { ChatRoom } from '../ChatRoom';
import type { EventSubConnection } from '../../enums';

/**
 * The warns manager of a chatroom.
 */
export class WarnsManager<T extends EventSubConnection> extends Base<T>{

  /**
    * The chatroom instance.
    */

  public readonly chatroom: ChatRoom<T>;
    
  /**
   * Creates a new instance of the warns manager.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom instance.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
  }
    
  /**
   * Creates warn for an user in a specific chatroom.
   * @param chatroomId The id of the chatroom where the user will be warned.
   * @param userId The id of the user to warn.
   * @returns 
   */
  public async create(userId: string, reason: string){
    return new Warning(this.chatbot, await this.chatbot.helixClient.warnChatUser(this.chatroom.id, this.chatbot.userId, { data: { user_id: userId, reason } }));
  }
}