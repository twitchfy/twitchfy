import { Base } from '../Base';
import type { ChatRoom } from '../ChatRoom';
import type { ChatBot } from '../ChatBot';
import type { EventSubConnection } from '../../enums';

/**
 * Represents a chatter manager of a chatroom.
 */
export class ChatterManager<T extends EventSubConnection> extends Base<T> {

  /**
     * The chatroom of the chatter manager.
     */
  public readonly chatroom: ChatRoom<T>;

  /**
     * Creates a new instance of the chatter manager.
     * @param chatbot The current instance of the chatbot.
     * @param chatroom The chatroom of the chatter manager.
     */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>) {
    super(chatbot);
    this.chatroom = chatroom;
  }

  /**
       * Fetches the chatters of the chatroom.
       * @returns The chatters of the chatroom.
       */
  public async fetch() {
    return await this.chatbot.chatters.fetch(this.chatroom.id);
  }

  /**
       * Gets the amount of chatters in the chatroom.
       * @returns The amount of chatters in the chatroom.
       */
  public async count() {
    return await this.chatbot.chatters.count(this.chatroom.id);
  }
}