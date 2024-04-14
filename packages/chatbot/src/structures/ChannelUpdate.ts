import type { ChannelUpdateMessage } from '@twitchapi/eventsub';
import { BaseUser } from './BaseUser';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';
import type { Category, EventSubConnectionMap } from '../interfaces';

/**
 * Represents a channel update event.
 */
export class ChannelUpdate<T extends EventSubConnection> extends Base<T> {

  /**
   * The broadcaster of the channel who was updated.
   */
  public broadcaster: BaseUser<T>;

  /**
   * The title of the channel.
   */
  public title: string;

  /**
   * The language of the channel.
   */
  public language: string;

  /**
   * The category of the channel.
   */
  public category: Category;

  /**
   * The classification labels of the channel.
   */
  public classificationLabels: string[];

  /**
   * The data of the update event returned from the EventSub.
   */
  private data: ChannelUpdateMessage<EventSubConnectionMap[T]>;

  /**
   * Creates a new instance of the channel update event.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the update event returned from the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: ChannelUpdateMessage<EventSubConnectionMap[T]>){
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { ...data.broadcaster, display_name: data.broadcaster.displayName });
    this.title = data.title;
    this.language = data.language;
    this.category = { id: data.category.id, name: data.category.name };
    this.classificationLabels = data.labels;
  }

  /**
   * The ID of the broadcaster who was updated.
   */
  public get broadcasterID(){
    return this.data.broadcaster.id;
  }

  /**
   * Fetches the channel from the API.
   * @returns The fetched channel from the API.
   */
  public async channel(){
    return this.chatbot.channels.fetch(this.broadcasterID);
  }
}