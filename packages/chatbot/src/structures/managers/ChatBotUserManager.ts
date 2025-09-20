import type { EventSubConnection } from '../../enums';
import { Base } from '../Base';
import { User } from '../User';
import type { ChatBot } from '../ChatBot';

/**
 * The user manager of the chatbot.
 */
export class ChatBotUserManager<T extends EventSubConnection> extends Base<T> {

  /**
   * Creates a new instance of the user manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }

  /**
   * Fetches a specific user.
   * @param userIdentificator The id or login of the user to fetch.
   * @returns A class representation of the user. See {@link User}.
   */
  public async fetch(userIdentificator: string){
    return new User(this.chatbot, await this.chatbot.helixClient.getUser(userIdentificator));
  }

}