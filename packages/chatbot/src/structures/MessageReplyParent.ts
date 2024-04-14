import type { ChatBot } from './ChatBot';
import type { ChatRoom } from './ChatRoom';
import type { BaseMessageData } from './BaseMessage';
import { BaseMessage } from './BaseMessage';
import type { EventSubConnection } from '../enums';

/**
 * Represents a message in a chatroom that was replied by another message.
 */
export class MessageReplyParent<T extends EventSubConnection> extends BaseMessage<T> {

  /**
   * The chatroom where the message was sent.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * Creates a new instance of the message reply parent.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the message.
   * @param chatroom The chatroom where the message was sent.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseMessageData, chatroom: ChatRoom<T>){
    super(chatbot, data);
    this.chatroom = chatroom;
  }
}