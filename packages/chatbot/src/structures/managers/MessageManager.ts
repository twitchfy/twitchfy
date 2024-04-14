import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import type { ChatRoom } from '../ChatRoom';
import type { EventSubConnection } from '../../enums';


/**
 * Represents the manager for the messages of a chatroom.
 */
export class MessageManager<T extends EventSubConnection> extends Base<T> {

  /**
   * The chatroom instance.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * Creates a new instance of the message manager.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom instance.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
  }

  /**
   * Deletes a message from the chatroom.
   * @param id The id of the message to delete.
   * @returns
   */
  public async delete(id: string){
    return await this.chatbot.messages.delete(id, this.chatroom.id);
  }

  /**
   * Fetches a message from the chatroom.
   * @param id The id of the message to fetch.
   * @returns The message fetched.
   */
  public async send(message: string){
    return await this.chatbot.messages.send(this.chatroom.id, message);
  }
}