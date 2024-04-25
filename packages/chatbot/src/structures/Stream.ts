/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { GetStream } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import { BaseStream } from './BaseStream';
import type { EventSubConnection } from '../enums';
import type { Game, ThumbailOptions } from '../interfaces';

/**
 * Represents a Twitch stream.
 */
// @ts-expect-error
export class Stream<T extends EventSubConnection> extends BaseStream<T> {

  /**
   * The amount of viewers watching the stream.
   */
  public readonly viewerCount: number;

  /**
   * The language of the stream.
   */
  public readonly language: string;

  /**
   * The tags of the stream.
   */
  public readonly tags: string[];

  /**
   * Whether the stream is marked as mature.
   */
  public readonly isMature: boolean;

  /**
   * The game which is currently being played on the stream.
   */
  public readonly game: Game;

  /**
   * The data of the stream returned from the API.
   */
  private override data: GetStream;

  /**
   * Creates a new instance of the stream.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the stream returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: GetStream){
    super(chatbot, data);
    this.data;
    this.viewerCount = data.viewer_count;
    this.language = data.language;
    this.tags = data.tags;
    this.isMature = data.is_mature;
    this.game = { id: data.game_id, name: data.game_name };
  }

  /**
   * The title of the stream.
   */
  public get title(){
    return this.data.title.length ? this.data.title : null;
  }

  /**
   * The thumbnail URL of the stream.
   * @param options The options for the thumbnail.
   */
  public thumbnailURL(options?: ThumbailOptions){
    return this.data.thumbnail_url.replace('{width}', options?.width?.toString() || '1920').replace('{height}', options?.height?.toString() || '1080');
  }
}