import type { GetClipsOptions } from '@twitchfy/helix';
import { Base } from './Base';
import type { ChatRoom } from './ChatRoom';
import { BaseUser } from './BaseUser';
import type { ChatBot } from './ChatBot';
import { ChannelEmote } from './ChannelEmote';
import { Collection } from './Collection';
import type { EventSubConnection } from '../enums';

export class BaseChannel<T extends EventSubConnection = EventSubConnection> extends Base<T> {

  /**
     * The id of the channel.
     */
  public readonly id: string;
  /**
     * The broadcaster of the channel.
     */
  public readonly broadcaster: BaseUser<T>;

  /**
     * The chatroom of the channel.
     */
  public readonly chatroom: ChatRoom<T>;


  public constructor(chatbot: ChatBot<T>, data: BaseChannelData, chatroom: ChatRoom<T>) {
    super(chatbot);
    this.id = data.broadcaster_id;
    this.broadcaster = new BaseUser<T>(chatbot, { id: data.broadcaster_id, login: data.broadcaster_login, display_name: data.broadcaster_name });
    this.chatroom = chatroom;
  }

  /**
     * The id of the broadcaster who owns the channel.
     */
  public get broadcasterID() {
    return this.broadcaster.id;
  }

  /**
     * The id of the chatroom of the channel.
     */
  public get chatroomID() {
    return this.broadcaster.id;
  }

  /**
     * The chatroom bans manager. See {@link BanManager}.
     */
  public get bans() {
    return this.chatroom.bans;
  }

  /**
     * The chatroom timeouts manager. See {@link TimeoutManager}.
     */
  public get timeouts() {
    return this.chatroom.timeouts;
  }

  /**
     * The chatroom messages manager. See {@link MessageManager}.
     */
  public get messages() {
    return this.chatroom.messages;
  }

  /**
     * Fetches all the emotes of this channel.
     * @returns The a Collection containing all the emotes of the channel.
     */
  public async emotes() {
    const data = await this.chatbot.helixClient.getChannelEmotes(this.broadcaster.id);
    return new Collection<string, ChannelEmote<T>>(data.emotes.map(emote => [emote.id, new ChannelEmote<T>(this.chatbot, { ...emote, owner_id: this.broadcaster.id, template: data.template })]));
  }

  /**
     * Fetches the current stream of the channel from the API.
     * @returns The current stream or null if the stream is offline.
     */
  public async stream() {
    return await this.chatbot.stream({ user_id: this.broadcaster.id });
  }

  /**
     * Fetches the clips of the channel from the API.
     * @param options The options to fetch the clips.
     * @returns An array containing the clips of the channel.
     */
  public async clips(options?: Omit<GetClipsOptions<true>, 'broadcaster_id'>) {
    if (options?.id) return await this.chatbot.clips(options);
    return await this.chatbot.clips({ ...options, broadcaster_id: this.broadcaster.id });
  }

  public async isModerator(){
    return await this.chatbot.isModerator(this.broadcaster.id);
  }

  /**
     * Fetches the current channel from the API.
     * @returns The fetched channel from the API.
     */
  public async fetch() {
    const { Channel } = await import('./Channel');
    return new Channel<T>(this.chatbot, await this.chatbot.helixClient.getChannel(this.broadcaster.id));
  }

}

export interface BaseChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
}