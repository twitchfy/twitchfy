import type { Channel as ChannelData } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';
import type { Game } from '../interfaces';
import { BaseChannel } from './BaseChannel';
import { ChatRoom } from './ChatRoom';

/**
 * Represents a Twitch channel.
 */
export class Channel<T extends EventSubConnection> extends BaseChannel<T>{

  /**
   * The game which was currently set into the channel.
   */
  public readonly game: Game;

  /**
   * The tags of the channel.
   */
  public readonly tags: string[];

  /**
   * The classification labels of the channel.
   */
  public readonly classificationLabels: string[];

  /**
   * Whether the channel has branded content.
   */
  public readonly isBrandedContent: boolean;

  /**
   * The data of the channel returned from the API.
   */
  private data: ChannelData;

  /**
   * Creates a new instance of the channel.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the channel returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: ChannelData){
    super(chatbot, data, new ChatRoom<T>(chatbot, data));
    this.data = data;
    this.game = { id: data.game_id, name: data.game_name };
    this.tags = data.tags;
    this.classificationLabels = data.content_classification_labels;
    this.isBrandedContent = data.is_branded_content;
  }


  /**
   * The title of the channel. If it was never set, it will return a nullish value.
   */
  public get title(){
    return this.data.title.length ? this.data.title : null;
  }

  /**
   * The language that was set to the channel.
   */
  public get language(){
    return this.data.broadcaster_language;
  }
}