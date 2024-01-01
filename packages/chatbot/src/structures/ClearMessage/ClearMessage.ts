import type { ClearMessageTags } from '../../interfaces/tags/ClearMessageTags';
import { parseCommand, parseMessage } from '../../utils/ChatBotMessageParser';
import { ChatBot } from '../../ChatBot';
import { ClearMessageUser } from '../ClearMessage/ClearMessageUser';
import { ClearMessageChannel } from './ClearMessageChannel';


/**
 * @class
 * Represents a ClearMessage message that is fired when a chat message is deleted.
 */
export class ClearMessage{

  /**
     * @description The current instance of the {@link ChatBot}
     */
  public chatbot: ChatBot;

  /**
     * @description The channel where the ClearMessage event is fired.
     */
  public channel: ClearMessageChannel;

  /**
     * @description The user whose message was deleted.
     */
  public user: ClearMessageUser;

  /**
     * @description The content of the message that was deleted.
     */

  public messageContent: string;

  /**
     * 
     * @param chatbot 
     * @param data 
     * @param tags 
     */
  public constructor(chatbot: ChatBot, data: string, tags: ClearMessageTags){


    this.chatbot = chatbot;
    this.user = new ClearMessageUser(this.chatbot, tags);
    this.messageContent = parseMessage(data, 'parameters').slice(0, -2);
    this.channel = new ClearMessageChannel(this.chatbot, parseCommand(data).channel.slice(1));
  }
}