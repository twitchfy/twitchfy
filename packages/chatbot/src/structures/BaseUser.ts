import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import type { EventSubConnection } from '../enums';

/**
 * The base class for a user.
 */
export class BaseUser<T extends EventSubConnection> extends Base<T> {
  
  /**
   * The id of the user.
   */
  public readonly id: string;

  /**
   * The username of the user.
   */
  public readonly username: string;

  /**
   * The display name of the user.
   */
  public readonly displayName: string;

  /**
   * Creates a new instance of the base user.
   * @param chatbot The current instance of the chatbot.
   * @param data The base data of the user.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseUserData){
    super(chatbot);
    this.id = data.id;
    this.username = data.login;
    this.displayName = data.display_name;
  }

  /**
   * Gets the chatroom of the user.
   * @returns The chatroom of the user.
   */
  public async chatroom(){
    const { ChatRoom } = await import('./ChatRoom');
    return new ChatRoom<T>(this.chatbot, { broadcaster_id: this.id, broadcaster_login: this.username, broadcaster_name: this.displayName });
  }

  /**
   * Fetches the current user from the API.
   * @returns The fetched user from the API.
   */
  public async fetch(){
    return this.chatbot.users.fetch(this.id);
  }

  /**
   * Returns the mention of the user. 
   */
  public override toString(){
    return `@${this.displayName}`;
  }

  /**
   * Fetches the current stream of the user from the API.
   * @returns The current stream or null if the stream is offline.
   */
  public async stream(){
    return await this.chatbot.stream({ user_id: this.id });
  }

  /**
   * Checks whether the user is currently streaming.
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
    return await this.chatbot.helixClient.sendWhisper(this.chatbot.userID, this.id, { message });
  }
}

/**
 * The base data of an user.
 */
export interface BaseUserData {
    /**
     * The id of the user.
     */
    id: string
    /**
     * The username of the user.
     */
    login: string
    /**
     * The display name of the user.
     */
    display_name: string
}
