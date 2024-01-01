import { ClearChatTags } from '../../interfaces/tags/ClearChatTags';
import { ChatBot } from '../../ChatBot';
import { ClearChatUser } from './ClearChatUser';
import { ClearChatChannel } from './ClearChatChannel';
import { parseCommand } from '../../utils/ChatBotMessageParser';

/**
 * @class
 * Represents a ClearChat message that is fired when a chat is cleared or a all user's message are cleared.
 */
export class ClearChat{

  /**
     * @description The current instance of the {@link ChatBot}
     */

  public chatbot: ChatBot;

  /**
     * @description The channel where the ClearChat event was fired.
     */
  public channel: ClearChatChannel;

  /**
     * @description The duration of the ban. Is null in cases where the event is not triggered due to the deletion of all the user's messages or when the ban is not implemented as a timeout.
     */
  public banDuration : number | null;

  /**
     * @description The user whose messages were deleted. This is null if the event is triggered due to the deletion of all the messages in the chat.
     */
  public user: ClearChatUser | null;

  /**
     * 
     * @param chatbot 
     * @param data 
     * @param tags 
     */

  public constructor(chatbot: ChatBot, data: string, tags: ClearChatTags){
       
    this.chatbot = chatbot;
    this.banDuration = tags['ban-duration'] ? Number(tags['ban-duration']) : null;
    this.user = tags['target-user-id']? new ClearChatUser(this.chatbot, tags) : null;
    this.channel = new ClearChatChannel(this.chatbot, parseCommand(data).channel.slice(1), tags['room-id']);
        
  }
}