import { Base } from '../Base';
import type { ChatBot } from '../ChatBot';
import { BaseMessage } from '../BaseMessage';
import type { EventSubConnection } from '../../enums';

/**
 * The message manager of the chatbot.
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
   * @param chatroomId The id of the chatroom where the message will be deleted.
   * @param id The id of the message to delete.
   * @returns 
   */
  public async delete(chatroomId: string, id: string){
    return await this.chatbot.helixClient.deleteMessage(id, chatroomId, this.chatbot.userId);
  }
    
  /**
   * 
   * @param chatroomId The id of the chatroom where the message will be sent.
   * @param message The message to send.
   * @param options The options to send the message. See {@link MessageOptions}.
   * @returns A class representation of the message. See {@link BaseMessage}.
   */
  public async send(chatroomId: string, message: string, options?: MessageOptions){
    const messageData = await this.chatbot.helixClient.sendChatMessage({ message, broadcaster_id: chatroomId, sender_id: this.chatbot.userId, reply_parent_message_id: options?.replyMessageId });
    if(messageData.drop_reason) throw new Error(messageData.drop_reason.message);
    return new BaseMessage(this.chatbot, { id: messageData.message_id, content: message, user_id: this.chatbot.user.id, user_login: this.chatbot.user.username, user_name: this.chatbot.user.displayName, chatroom_id: chatroomId });
  }
}

/**
 * The options to send a message.
 */
export interface MessageOptions {
  /**
   * The id of the message to reply.
   */
  replyMessageId?: string;
}