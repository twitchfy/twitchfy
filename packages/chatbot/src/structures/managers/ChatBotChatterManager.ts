import { Base } from '../Base';
import { BaseUser } from '../BaseUser';
import type { ChatBot } from '../ChatBot';
import type { EventSubConnection } from '../../enums';


/**
 * Represents a chatter manager.
 */
export class ChatBotChatterManager<T extends EventSubConnection> extends Base<T> {

  /**
       * Creates a new instance of the chatter manager.
       * @param chatbot The current instance of the chatbot.
       */
  public constructor(chatbot: ChatBot<T>) {
    super(chatbot);
  }

  /**
     * Fetches the chatters of a chatroom.
     * @param chatroomId The id of the chatroom to fetch the chatters.
     * @returns The chatters of the chatroom.
     */
  public async fetch(chatroomId: string) {
    return (await this.chatbot.helixClient.getChatters(chatroomId, this.chatbot.userId)).map((x) => new BaseUser(this.chatbot, { id: x.user_id, login: x.user_login, display_name: x.user_name }));
  }

  /**
     * Gets the amount of chatters in a chatroom.
     * @param chatroomId The id of the chatroom to count the chatters.
     * @returns The amount of chatters in the chatroom.
     */
  public async count(chatroomId: string) {
    return await this.chatbot.helixClient.getChattersCount(chatroomId, this.chatbot.userId);
  }
}