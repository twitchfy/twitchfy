import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import type { ChatRoom } from '../ChatRoom';
import type { EventSubConnection } from '../../enums';
import type { TimeoutOptions } from '../../interfaces';

/**
 * The timeout manager of a chatroom.
 */
export class TimeoutManager<T extends EventSubConnection> extends Base<T>{

  /**
   * The chatroom instance.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * Creates a new instance of the timeout manager.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom instance.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
  }

  /**
   * Timeout a specific user within the chatroom.
   * @param options The options required for send an user into a timeout. See {@link TimeoutOptions}.
   * @returns 
   */
  public async add(options: TimeoutOptions){
    return await this.chatbot.timeouts.add(this.chatroom.id, options);
  }

  /**
   * Deletes the timeout of a specific user within the chatroom.
   * @param userID The id of the user to remove from the timeout.
   * @returns 
   */
  public async delete(userID: string){
    return await this.chatbot.timeouts.delete(this.chatroom.id, userID);
  }

}