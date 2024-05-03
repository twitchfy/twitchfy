import type { BaseMessageData } from './BaseMessage';
import { BaseMessage } from './BaseMessage';
import type { ChatRoom } from './ChatRoom';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';

/**
 * Represents the message which started a thread of replies.
 */
export class MessageReplyThread<T extends EventSubConnection> extends BaseMessage<T> {

  /**
   * The chatroom where the message was sent.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * Creates a new instance of the message reply thread.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the message.
   * @param chatroom The chatroom where the message was sent.
   */
  public constructor(chatbot: ChatBot<T>, data: Omit<BaseMessageData, 'content'>, chatroom: ChatRoom<T>){
    super(chatbot, { ...data, content: null });
    this.chatroom = chatroom;
  }
}