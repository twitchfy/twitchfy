import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { BaseMessage } from '../BaseMessage';
import type { EventSubConnection } from '../../enums';

/**
 * The message manager of the chatobot.
 */
export class ChatBotMessageManager<T extends EventSubConnection> extends Base<T>{
    
  /**
   * Creates a new instance of the message manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }
    
  /**
   * Deletes a specific message from a chatroom.
   * @param chatroomID The id of the chatroom where the message will be deleted.
   * @param id The id of the message to delete.
   * @returns 
   */
  public async delete(chatroomID: string, id: string){
    return await this.chatbot.helixClient.deleteMessage(id, chatroomID, this.chatbot.userID);
  }
    
  /**
   * 
   * @param chatroomID The id of the chatroom where the message will be sent.
   * @param message The message to send.
   * @param options The options to send the message. See {@link MessageOptions}.
   * @returns A class representation of the message. See {@link BaseMessage}.
   */
  public async send(chatroomID: string, message: string, options?: MessageOptions){
    const messageData = await this.chatbot.helixClient.sendChatMessage({ message, broadcaster_id: chatroomID, sender_id: this.chatbot.userID, reply_parent_message_id: options?.replyMessageID });
    if(messageData.drop_reason) throw new Error(messageData.drop_reason.message);
    return new BaseMessage(this.chatbot, { id: messageData.message_id, content: message, user_id: this.chatbot.user.id, user_login: this.chatbot.user.username, user_name: this.chatbot.user.displayName, chatroom_id: chatroomID });
  }
}

/**
 * The options to send a message.
 * @param replyMessageID The id of the message to reply.
 */
export interface MessageOptions {
  replyMessageID?: string;
}