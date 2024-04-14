import type { GetVideo, MutedSegment, VideoType } from '@twitchapi/api-types';
import { Base } from './Base';
import { BaseUser } from './BaseUser';
import type { ChatBot } from './ChatBot';
import { parseTime } from '../util';
import type { EventSubConnection } from '../enums';
import type { ThumbailOptions } from '../interfaces';

/**
 * Represents a Twitch video.
 */
export class Video<T extends EventSubConnection> extends Base<T> {

  /**
   * The id of the video.
   */
  public readonly id: string;

  /**
   * The id of the stream the video was created from. If the stream was ended this will be null.
   */
  public readonly streamID: string | null;

  /**
   * The user who created the video.
   */
  public readonly user: BaseUser<T>;

  /**
   * The title of the video.
   */

  public readonly title: string;

  /**
   * The description of the video.
   */
  public readonly description: string;

  /**
   * The video's url.
   */
  public readonly url: string;

  /**
   * The number of views the video has.
   */

  public readonly viewCount: number;

  /**
   * The language of the video.
   */
  public readonly language: string;

  /**
   * The type of the video.
   */
  public readonly type: VideoType;

  /**
   * The muted segments of the video.
   */
  public readonly mutedSegments: MutedSegment[] | null;

  /**
   * The data of the video from the API.
   */
  private readonly data: GetVideo;


  public constructor(chatbot: ChatBot<T>, data: GetVideo){
    super(chatbot);
    this.data = data;
    this.id = data.id;
    this.streamID = data.stream_id;
    this.user = new BaseUser<T>(chatbot, { id: data.user_id, login: data.user_login, display_name: data.user_name });
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.viewCount = data.view_count;
    this.language = data.language;
    this.type = data.type;
    this.mutedSegments = data.muted_segments;
  }

  /**
   * The creation date of the video in JavaScript Date object.
   */
  public get createdAt(){
    return new Date(this.data.created_at);
  }

  /**
   * The publish date of the video in JavaScript Date object.
   */
  public get publishedAt(){
    return new Date(this.data.published_at);
  }

  /**
   * The thumbnail URL of the video.
   * @param options The options for the thumbnail.
   * @returns The thumbnail URL of the video.
   */
  public thumbnailURL(options?: ThumbailOptions){
    return this.data.thumbnail_url.replace('%{width}', options?.width?.toString() || '1920').replace('%{height}', options?.height?.toString() || '1080');
  }

  /**
   * The duration of the video in seconds.
   */
  public get duration(){
    
    let duration = 0;

    const regex = new RegExp(/(\d+[a-zA-Z]+)/g);

    const split = this.data.duration.split(regex);

    for(const value of split){
      const time = parseTime(value);
      if(time) duration += time;
    }

    return duration / 1000;
  }
}
