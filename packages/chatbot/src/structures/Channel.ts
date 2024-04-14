import type { Channel as ChannelData } from '@twitchapi/api-types';
import type { GetClipsOptions } from '@twitchapi/helix';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import { BaseUser } from './BaseUser';
import { Collection } from './Collection';
import { ChannelEmote } from './ChannelEmote';
import { ChatRoom } from './ChatRoom';
import type { EventSubConnection } from '../enums';
import type { Game } from '../interfaces';

/**
 * Represents a Twitch channel.
 */
export class Channel<T extends EventSubConnection> extends Base<T>{

  /**
   * The broadcaster of the channel.
   */
  public readonly broadcaster: BaseUser<T>;

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
   * The chatroom of the channel.
   */
  public readonly chatroom: ChatRoom<T>;

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
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { id: data.broadcaster_id, login: data.broadcaster_login, display_name: data.broadcaster_name });
    this.game = { id: data.game_id, name: data.game_name };
    this.tags = data.tags;
    this.classificationLabels = data.content_classification_labels;
    this.isBrandedContent = data.is_branded_content;
    this.chatroom = new ChatRoom<T>(chatbot, { broadcaster_id: data.broadcaster_id, broadcaster_login: data.broadcaster_login, broadcaster_name: data.broadcaster_name });
  }

  /**
   * The id of the broadcaster who owns the channel.
   */
  public get broadcasterID(){
    return this.broadcaster.id;
  }

  /**
   * The id of the chatroom of the channel.
   */
  public get chatroomID(){
    return this.broadcaster.id;
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

  /**
   * The chatroom bans manager. See {@link BanManager}.
   */
  public get bans(){
    return this.chatroom.bans;
  }

  /**
   * The chatroom timeouts manager. See {@link TimeoutManager}.
   */
  public get timeouts(){
    return this.chatroom.timeouts;
  }

  /**
   * The chatroom messages manager. See {@link MessageManager}.
   */
  public get messages(){
    return this.chatroom.messages;
  }

  /**
   * Fetches all the emotes of this channel.
   * @returns The a Collection containing all the emotes of the channel.
   */
  public async emotes(){
    const data = await this.chatbot.helixClient.getChannelEmotes(this.broadcaster.id);
    return new Collection<string, ChannelEmote<T>>(data.emotes.map(emote => [emote.id, new ChannelEmote<T>(this.chatbot, { ...emote, owner_id: this.broadcaster.id, template: data.template })]));
  } 

  /**
   * Fetches the current stream of the channel from the API.
   * @returns The current stream or null if the stream is offline.
   */
  public async stream(){
    return await this.chatbot.stream({ user_id: this.broadcaster.id });
  }

  /**
   * Fetches the clips of the channel from the API.
   * @param options The options to fetch the clips.
   * @returns An array containing the clips of the channel.
   */
  public async clips(options?: Omit<GetClipsOptions<true>, 'broadcaster_id'>){
    if(options?.id) return await this.chatbot.clips(options);
    return await this.chatbot.clips({ ...options, broadcaster_id: this.broadcaster.id });
  }
    
  /**
   * Fetches the current channel from the API.
   * @returns The fetched channel from the API.
   */
  public async fetch(){
    return new Channel<T>(this.chatbot, await this.chatbot.helixClient.getChannel(this.broadcaster.id));
  }
}