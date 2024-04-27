import { Base } from '../Base';
import type { ChatRoom } from '../ChatRoom';
import type { ChatBot } from '../ChatBot';
import type { EventSubConnection } from '../../enums';
import type { BanOptions } from '../../interfaces';

/**
 * The ban manager of a chatroom.
 */
export class BanManager<T extends EventSubConnection> extends Base<T>{

  /**
   * The chatroom which includes this manager.
   */
  public readonly chatroom: ChatRoom<T>;
  
  /**
   * Creates a new instance of the badge manager.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom which includes this manager.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
  }

  /**
   * Ban a specific user.
   * @param options The options required for banning an user. See {@link BanOptions}.
   * @returns A class representation of the ban. See {@link Ban}. 
   */
  public async add(options: BanOptions){
    return await this.chatbot.bans.add(this.chatroom.id, options);
  }

  /**
   * Deletes the ban of a specific user.
   * @param userId The id of the user to unban. 
   * @returns 
   */
  public async delete(userId: string){
    return await this.chatbot.bans.delete(this.chatroom.id, userId);
  }

}