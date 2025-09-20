import type { GetClip } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import { BaseClip } from './BaseClip';
import { Video } from './Video';
import { BaseUserWithoutUsername } from './BaseUserWithoutUsername';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch clip.
 */
export class Clip<T extends EventSubConnection> extends BaseClip<T>{
   
  /** 
   * The URL to embed the clip in a frame.
   */
  public readonly embedURL: string;

  /**
   * The user who created the clip. The user will not have an username because Twitch limitations.
   */
  public readonly creator: BaseUserWithoutUsername<T>;

  /**
   * The user who broadcasted the clip. The user will not have an username because Twitch limitations.
   */
  public readonly broadcaster: BaseUserWithoutUsername<T>;

  /**
   * The Id of the game which was played in the clip.
   */
  public readonly gameId: string;

  /**
   * The language of the clip.
   */
  public readonly language: string;

  /**
   * The title of the clip.
   */
  public readonly title: string;

  /**
   * The view count of the clip.
   */
  public readonly viewCount: number;

  /**
   * The URL to the thumbnail of the clip.
   */
  public readonly thumbnailURL: string;

  /**
   * The duration of the clip in seconds.
   */
  public readonly duration: number;

  /**
   * The offset in the VOD where the clip starts. If the clip is not from a VOD, this will be null.
   */
  public readonly vodOffset: number | null;

  /**
   * Whether the clip is featured.
   */
  public readonly isFeatured: boolean;

  /**
   * The data of the clip returned from the API.
   */
  private data: GetClip;

  /**
   * Creates a new instance of the clip.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the clip returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: GetClip){
    super(chatbot, data);
    this.data = data;
    this.embedURL = data.embed_url;
    this.creator = new BaseUserWithoutUsername(chatbot, { id: data.creator_id, display_name: data.creator_name });
    this.broadcaster = new BaseUserWithoutUsername(chatbot, { id: data.broadcaster_id, display_name: data.broadcaster_name });
    this.gameId = data.game_id;
    this.language = data.language;
    this.title = data.title;
    this.viewCount = data.view_count;
    this.thumbnailURL = data.thumbnail_url;
    this.duration = data.duration;
    this.vodOffset = data.vod_offset;
    this.isFeatured = data.is_featured;
  }

  /**
   * When the clip was created. Returns a JavaScript Date object.
   */
  public get createdAt(){
    return new Date(this.data.created_at);
  }

  /**
   * The Id of the video of the clip.
   */
  public get videoId(){
    return this.data.video_id.length? this.data.video_id : null;
  }

  /**
   * Fetches the video of the clip.
   * @returns The video of the clip. Returns null if the video doesn't exist.
   */
  public async video(){
    if(!this.videoId) return null;
    return new Video<T>(this.chatbot, await this.chatbot.helixClient.getVideo({ id: this.videoId }));
  }

  /**
   * Fetches the stream of the broadcaster of the clip.
   * @returns The stream of the broadcaster of the clip. If the stream is offline, it will return null.
   */
  public async stream(){
    return await this.chatbot.stream({ user_id: this.broadcaster.id });
  }

  /**
   * Fetches the download URLs of the clip. Either landscape or portrait. For this to work, the bot has to be an editor of the clip's channel and the user token must have the `editor:manage:clips` scope or `channel:manage:clips` if the bot is the broadcaster of the channel.
   * @returns An object with each download URL. The field is null if the download URL doesn't exist.
   */

  public async getDownloadURL(): Promise<{ landscape: string | null; portrait: string | null }> {
    const data = await this.chatbot.helixClient.getClipDownload(this.id, this.chatbot.userId, this.broadcaster.id);
    return {
      landscape: data[0].landscape_download_url ?? null,
      portrait: data[0].portrait_download_url ?? null
    };
  }

  /**
   * Downloads the clip's video data. For this to work, the bot has to be an editor of the clip's channel and the user token must have the `editor:manage:clips` scope or `channel:manage:clips` if the bot is the broadcaster of the channel.
   * @returns An object of buffers containing the clip's video data in either portrait or landscape format. The field is null if the download URL doesn't exist or the fetch fails.
   */
  public async download(): Promise<{ landscape: Buffer | null; portrait: Buffer | null }> {
    const urls = await this.getDownloadURL();
    const landscape = urls.landscape ? await fetch(urls.landscape).then(res => res.ok ? res.arrayBuffer().then(buffer => Buffer.from(buffer)) : null) : null;
    const portrait = urls.portrait ? await fetch(urls.portrait).then(res => res.ok ? res.arrayBuffer().then(buffer => Buffer.from(buffer)) : null) : null;
    return { landscape, portrait };
  }
}