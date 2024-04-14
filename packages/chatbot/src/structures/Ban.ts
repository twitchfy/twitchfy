import type { Ban as BanData } from '@twitchapi/api-types';
import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import type { EventSubConnection } from '../enums';

/**
 * Represents a ban in a chatroom.
 */
export class Ban<T extends EventSubConnection> extends Base<T> {
   
  /**
   * The ID of the user who was banned.
   */
  public readonly userID: string;

  /**
   * The ID of the moderator who banned the user.
   */
  public readonly moderatorID: string;

  /**
   * The data of the ban returned from the API.
   */
  private data: BanData;

  /**
   * Creates a new instance of the ban.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the ban returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: BanData){
    super(chatbot);
    this.data = data;
    this.userID = data.user_id;
    this.moderatorID = data.moderator_id;
  }

  /**
   * Deletes the ban from the chatroom.
   * @returns
   */
  public async delete(){
    return await this.chatbot.helixClient.unBanUser(this.chatroomID, this.moderatorID, this.userID);
  }

  /**
   * The ID of the chatroom where the ban was made.
   */
  public get chatroomID(){
    return this.data.broadcaster_id;
  }

  /**
   * The Date when the ban was created. Returns a JavaScript Date object.
   */
  public get createdAt(){
    return new Date(this.data.created_at);
  }

  /**
   * If the ban is a timeout this will return the end time of the timeout in a JavaScript Date object. If not, it will return a nullish value.
   */
  public get endTime(){
    return this.data.end_time ? new Date(this.data.end_time) : null;
  }
}