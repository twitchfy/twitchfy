import { Base } from './Base';
import type { BaseUserData } from './BaseUser';
import type { ChatBot } from './ChatBot';
import { User } from './User';
import type { EventSubConnection } from '../enums';


/**
 * The base class for a user without an username.
 */
export class BaseUserWithoutUsername<T extends EventSubConnection> extends Base<T> {

  /**
   * The id of the user.
   */
  public readonly id: string;

  /**
   * The display name of the user.
   */
  public readonly dislayName: string;

  /**
   * Creates a new instance of the base user without an username.
   * @param chatbot The current instance of the chatbot.
   * @param data The base data of the user.
   */
  public constructor(chatbot: ChatBot<T>, data: Omit<BaseUserData, 'login'>){
    super(chatbot);
    this.id = data.id;
    this.dislayName = data.display_name;
  }

  /**
   * Fetches the current user from the API.
   * @returns The fetched user from the API.
   */
  public async fetch(){
    return new User<T>(this.chatbot, await this.chatbot.helixClient.getUser(this.id));
  }

  /**
   * Returns the mention of the user. 
   */
  public override toString(){
    return `@${this.dislayName}`;
  }

  /**
   * Fetches the current stream of the user from the API.
   * @returns The current stream or null if the stream is offline.
   */
  public async stream(){
    const { Stream } = await import('./Stream');
    const data = await this.chatbot.helixClient.getStream({ user_id: this.id });
    if (!data) return null;
    return new Stream<T>(this.chatbot, data);
  }

  /**
   * Returns whether the user is currently in stream or not.
   * @returns A boolean indicating whether the user is currently streaming.
   */
  public async inStream(){
    const stream = await this.stream();
    return !!stream;
  }

  /**
   * Sends a whisper to the user.
   * @param message The message to send.
   * @returns
   */
  public async whisper(message: string){
    return await this.chatbot.helixClient.sendWhisper(this.chatbot.userId, this.id, { message });
  }

}