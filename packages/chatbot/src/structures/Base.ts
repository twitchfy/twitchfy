import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';

/**
 * Represents the base class for all structures.
 * @internal
 */
export class Base<T extends EventSubConnection> {
  /**
   * The current instance of the chatbot.
   */
  public readonly chatbot: ChatBot<T>;

  /**
   * Creates a new instance of the base class.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    this.chatbot = chatbot;
  }
}