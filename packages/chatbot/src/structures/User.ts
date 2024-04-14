import type { User as UserData } from '@twitchapi/api-types'; 
import type { ChatBot } from './ChatBot';
import { BaseUser } from './BaseUser';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch user.
 */
export class User<T extends EventSubConnection> extends BaseUser<T> {

  /**
   * The description of the user.
   */
  public readonly description: string;

  /**
   * The profile image URL of the user.
   */
  public readonly profileImage: string;

  /**
   * The data of the user returned from the API.
   */
  private readonly data: UserData;

  /**
   * Creates a new instance of the user.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the user returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: UserData){
    super(chatbot, data);
    this.data = data;
    this.description = data.description;
    this.profileImage = data.profile_image_url;
  }

  /**
   * When the user was created. A JavaScript Date object is returned.
   */
  public get createdAt(){
    return new Date(this.data.created_at);
  }

  /**
   * The user's type.
   */
  public get userType(){
    return this.data.type.length ? this.data.type : 'normal';
  }

  /**
   * The user's broadcaster type. Possible values are 'partner', 'affiliate' and 'normal'.
   */
  public get broadcasterType(){
    return this.data.broadcaster_type.length ? this.data.broadcaster_type : 'normal';
  }

  /**
   * The user's offline image url. Returns null if the user has no offline image set
   */
  public get offlineImage(): string | null {
    return this.data.offline_image_url.length ? this.data.offline_image_url : null;
  }
}