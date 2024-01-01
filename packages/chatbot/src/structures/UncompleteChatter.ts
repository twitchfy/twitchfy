import { Chatter } from '@twitchapi/api-types';
import { ChatBot } from '../ChatBot';
import { Channel } from './Channel';
import { UncompleteChatterUser } from './UncompleteChatterUser';
import { BanOptions } from '../interfaces/BanOptions';
import { TimeoutOptions } from '../interfaces/TimeoutOptions';
import { TimeoutBody, BanBody } from '@twitchapi/helix';
import { Chat } from './Chat';
import { Ban } from './Ban';

/**
 * @class
 * Represents an uncomplete chatter.
 */
export class UncompleteChatter{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The channel where chatter is.
     */
  public channel: Channel;

  /**
     * @description The chat where the chatter is.
     */
  public chat: Chat;

  /**
     * @description The user's id of the chatter.
     */
  public id: string;

  /**
     * @description The login name of the chatter.
     */
  public login: string;

  /**
     * @description The chatter's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */
  public displayName: string;

  /**
     * @description The chatter user profile.
     */
  public user: UncompleteChatterUser;
    

  /**
     * 
     * @param chatbot 
     * @param channel 
     * @param data 
     */
  public constructor(chatbot: ChatBot, channel: Channel, data: Chatter){
    this.chatbot = chatbot;
    this.channel = channel;
    this.chat = this.channel.chat;
    this.user = new UncompleteChatterUser(this.chatbot, data);
    this.id = data.user_id;
    this.login = data.user_login;
    this.displayName = data.user_name;
  }

  /**
     * Ban the chatter from the chat of the channel.
     * @param {BanOptions} options The {@link BanOptions options} that you can complete to ban the user. 
     * @returns {Ban} Returns a {@link Ban} class that represents the ban.
     */
  public async ban(options?: BanOptions): Promise<Ban> {

    const banBody = new BanBody(this.id, options?.reason);

    return new Ban(this.chatbot, await this.chatbot.helixClient.banUser(this.channel.id, this.chatbot.user.id, banBody));
  }

  /**
     * Timeout the chatter from the chat of the channel.
     * @param {TimeoutOptions} options The {@link TimeoutOptions options} of the timeout. 
     * @returns {Ban} Returns a {@link Ban} class that represents the timeout.
     */
  public async timeout(options: TimeoutOptions): Promise<Ban> {

    const timeoutBody = new TimeoutBody(this.id, options.duration, options.reason);

    return new Ban(this.chatbot, await this.chatbot.helixClient.timeoutUser(this.channel.id , this.chatbot.user.id, timeoutBody));

  }
}