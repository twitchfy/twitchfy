/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Base } from './Base';
import { Message } from './Message';
import { Author } from './Author';
import type { ChatBot } from './ChatBot';
import { ChatRoom } from './ChatRoom';
import type { EventSubConnection } from '../enums';
import type { DefaultConnection, CommandOptionsAux, MessageData, OptionsRecord } from '../types';

/**
 * The context of the command.
 */
export class TwitchContext<K extends OptionsRecord = {}, T extends EventSubConnection = DefaultConnection> extends Base<T>{
    
  /**
   * The message received when the command was run.
   */
  public readonly message: Message<T>;

  /**
   * The options of the command.
   */
  public readonly options: CommandOptionsAux<T, K>;

  /**
   * The prefix used to run the command.
   */
  public readonly prefix: string;

  /**
   * The name of the command.
   */
  public readonly commandName: string;

  /**
   * The author of the command.
   */
  public readonly author: Author<T>; 

  /**
   * The chatroom where the command was run.
   */

  public readonly chatroom: ChatRoom<T>;

  /**
   * The data of the command.
   */
  // @ts-ignore
  private data: MessageData<T>;

  /**
   * Creates a new instance of the command context.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the command.
   */
  public constructor(chatbot: ChatBot<T>, data: MessageData<T, K>){
    super(chatbot);
    this.data = data;
    this.options = data.options; 
    this.prefix = data.prefix;
    this.commandName = data.commandName;
    this.author = new Author<T>(this.chatbot, { ...data.chatter, display_name: data.chatter.displayName });
    this.chatroom = new ChatRoom<T>(this.chatbot, { broadcaster_id: data.broadcaster.id, broadcaster_login: data.broadcaster.login, broadcaster_name: data.broadcaster.displayName });
    this.message = new Message<T>(this.chatbot, data, this.chatroom);
  }

  /**
   * Replies to the message of the command.
   * @param message The message to reply.
   */
  public async reply(message: string){
    return await this.message.reply(message);
  }
  
  /**
   * Checks whether the bot is moderator in this context.
   * @returns A boolean indicating whether the bot is moderator.
   */
  public async isModerator(){
    return await this.channel.isModerator();
  }

  /**
   * Fetches the stream which is currently live in the context. If the stream is offline, it will return null.
   */
  public async stream(){
    return await this.author.stream();
  }

  /**
   * Checks whether the author is a moderator in the context.
   */
  public async inStream(){
    return await this.author.inStream();
  }

  /**
   * The Id of the author of the command.
   */
  public get authorId(){
    return this.author.id;
  }

  /**
   * The content of the context's message. This message is parsed so it will return the message without the prefix and the command name.
   */
  public get content(){
    return this.message.content;
  }

  /**
   * The Id of the context's chatroom.
   */
  public get chatroomId(){
    return this.chatroom.id;
  }
  
  /**
   * The context's broadcaster.
   */
  public get broadcaster(){
    return this.chatroom.broadcaster;
  }

  /**
   * The mentions of the context's message.
   */
  public get mentions(){
    return this.message.mentions;
  }

  /**
   * The emotes of the context's message.
   */
  public get emotes(){
    return this.message.emotes;
  }

  /**
   * The cheermotes of the context's message.
   */
  public get cheermotes(){
    return this.message.cheermotes;
  }

  /**
   * The bits cheered in the context's message.
   */
  public get bits(){
    return this.message.bits;
  }

  /**
   * Fetches channel of the context's chatroom.
   */
  public get channel(){
    return this.chatroom.channel;
  }
}