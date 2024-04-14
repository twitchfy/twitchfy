import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import { BaseUser } from './BaseUser';
import type { EventSubConnection } from '../enums';

/**
 * The base class for a message.
 */
export class BaseMessage<T extends EventSubConnection> extends Base<T>{

  /**
   * The id of the message.
   */
  public readonly id: string;

  /**
   * The content of the message.
   */
  public readonly content: string | null;

  /**
   * The author of the message.
   */
  public readonly author: BaseUser<T>;

  /**
   * The base data of the message.
   */
  private data: BaseMessageData;

  /**
   * Creates a new instance of the base message.
   * @param chatbot The current instance of the chatbot.
   * @param data The base data of the message.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseMessageData){
    super(chatbot);
    this.data = data;
    this.id = data.id;
    this.content = data.content;
    this.author = new BaseUser<T>(chatbot, { id: data.user_id, login: data.user_login, display_name: data.user_name });
  }

  /**
   * Deletes the message from the chatroom.
   * @returns
   */
  public async delete(){
    return await this.chatbot.messages.delete(this.data.chatroom_id, this.id);
  }

  /**
   * Replies to the message.
   * @param message The message to reply with.
   * @returns The message that was sent as a reply.
   */
  public async reply(message: string){
    return await this.chatbot.messages.send(this.data.chatroom_id, message, { replyMessageID: this.id });
  }

  /**
   * The ID of the chatroom where the message was sent.
   */
  public get chatroomID(){
    return this.data.chatroom_id;
  }

  /**
   * Whether the message was sent by the chatbot.
   */
  public get self(){
    return this.author.id === this.chatbot.userID;
  }
}

/**
 * The base data for a message.
 * @param id The id of the message.
 * @param content The content of the message.
 * @param user_id The id of the user who sent the message.
 * @param user_name The display name of the user who sent the message.
 * @param user_login The login name of the user who sent the message.
 * @param chatroom_id The id of the chatroom where the message was sent.
 */
export interface BaseMessageData {
    id: string;
    content: string | null;
    user_id: string;
    user_name: string;
    user_login: string;
    chatroom_id: string;
}