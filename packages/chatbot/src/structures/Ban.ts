import { ChatBot } from '../ChatBot';
import { BanUser } from './BanUser';
import { Ban as BanData } from '@twitchapi/api-types';

/**
 * @class
 * Represents a ban in a channel. The ban can be a Twitch ban or a Twitch timeout. 
 */
export class Ban{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The broadcaster who has the channel where the ban was done.
     */
  public broadcaster: BanUser;

  /**
     * @description The user who was banned.
     */
  public user: BanUser;

  /**
     * @description The moderator who ban the user.
     */
  public moderator: BanUser;

  /**
     * @description The duration of the ban. This is null if the ban is a Twitch ban. 
     */
  public duration: number | null;

  /**
     * @description A JavaScript Date that represents when the ban was created.
     */
  public createdAt: Date;

  /**
     * 
     * @param chatbot 
     * @param data 
     */
  public constructor(chatbot: ChatBot, data: BanData){
    this.chatbot = chatbot;
    this.broadcaster = new BanUser(this.chatbot, data.broadcaster_id);
    this.user = new BanUser(this.chatbot, data.user_id);
    this.moderator = new BanUser(this.chatbot, data.moderator_id);
    this.duration = data.end_time;
    this.createdAt = new Date(data.created_at);
  }

  /**
     * Check if the ban is a Twitch ban.
     * @returns {boolean} Returns a boolean that determines if the ban is a Twitch ban.
     */
  public isBan() : boolean {
    return !this.duration;
  }

  /**
     * Check if the ban is a Twitch timeout
     * @returns {boolean} Returns a boolean that determines if the ban is a timeout.
     */
  public isTimeout() : boolean {
    return !!this.duration;
  }

  /**
     * Delete this ban.
     */
  public async delete(){

    return await this.chatbot.helixClient.unBanUser(this.broadcaster.id, this.chatbot.user.id, this.user.id);

  }

}