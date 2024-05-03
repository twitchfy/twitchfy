/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { ChatRoom } from './ChatRoom';
import { MessageReplyParent } from './MessageReplyParent';
import { MessageReplyThread } from './MessageReplyThread';
import type { EventSubConnection } from '../enums';
import type { MessageData } from '../types';

/**
 * Represents a message reply.
 */
export class MessageReply<T extends EventSubConnection> extends Base<T> {
   
  /**
   * The parent of the reply. This is the message which was replied.
   */
  public readonly parent: MessageReplyParent<T>;

  /**
   * The thread of the reply. This is the message which started the reply thread.
   */
  public readonly thread: MessageReplyThread<T>;

  /**
   * The data of the reply.
   */
  // @ts-ignore
  private data: MessageData<T>['message']['reply'];

  /**
   * Creates a new instance of the message reply.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the reply.
   * @param chatroom The chatroom where the reply was sent.
   */
  public constructor(chatbot: ChatBot<T>, data: NonNullable<MessageData<T>['message']['reply']>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.data = data;
    this.parent = new MessageReplyParent(chatbot, { id: data.parent.message.id, content: data.parent.message.content, user_id: data.parent.user.id, user_name: data.parent.user.displayName, user_login: data.parent.user.login, chatroom_id: chatroom.id }, chatroom);
    this.thread = new MessageReplyThread(chatbot, { id: data.thread.messageId, content: null, user_id: data.thread.user.id, user_name: data.thread.user.displayName, user_login: data.thread.user.login, chatroom_id: chatroom.id }, chatroom);
  }
}