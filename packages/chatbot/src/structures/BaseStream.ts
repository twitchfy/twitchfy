import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import { BaseUser } from './BaseUser';
import { BaseClip } from './BaseClip';
import type { EventSubConnection } from '../enums';

/**
 * The base class for a stream.
 */
export class BaseStream<T extends EventSubConnection> extends Base<T> {

  /**
   * The id of the stream.
   */
  public readonly id: string;

  /**
   * The type of the stream.
   */
  public readonly type: string;

  /**
   * The broadcaster of the stream.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The base data of the stream.
   */
  private data: BaseStreamData;

  /**
   * Creates a new instance of the base stream.
   * @param chatbot The current instance of the chatbot.
   * @param data The base data of the stream.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseStreamData){
    super(chatbot);
    this.data = data;
    this.id = data.id;
    this.type = data.type;
    this.broadcaster = new BaseUser<T>(chatbot, { id: data.user_id, login: data.user_login, display_name: data.user_name });
  }

  /**
   * Creates a new clip of the stream.
   * @param delay Whether to delay few seconds the clip or not.
   */
  public async createClip(delay?: boolean): Promise<BaseClip<T>>{
    return new BaseClip(this.chatbot, await this.chatbot.helixClient.createClip(this.data.user_id, delay));
  }

  /**
   * Fetches the current stream from the API.
   * @returns The current stream or null if the stream is offline.
   */
  public async fetch(){
    const { Stream } = await import('./Stream');
    const data = await this.chatbot.helixClient.getStream({ user_id: this.broadcaster.id });
    if (!data) return null;
    return new Stream<T>(this.chatbot, data);
  }

  /**
   * When the stream has started. Returns a JavaScript Date object.
   */
  public get startedAt(){
    return new Date(this.data.started_at);
  }
}

/**
 * The data of the base stream.
 * @param id The id of the stream.
 * @param type The type of the stream.
 * @param started_at When the stream has started.
 * @param user_id The id of the user who is streaming.
 * @param user_name The name of the user who is streaming.
 * @param user_login The login of the user who is streaming.
 */
export interface BaseStreamData {
    id: string;
    type: string;
    started_at: string;
    user_id: string;
    user_name: string;
    user_login: string;
}