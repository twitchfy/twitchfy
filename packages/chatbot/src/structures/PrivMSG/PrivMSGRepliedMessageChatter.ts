import type { PrivMSGTags } from '../../interfaces/tags/PrivMSGTags';
import type { ChatBot } from '../../ChatBot';
import { BanBody, TimeoutBody} from '@twitchapi/helix';
import type { BanOptions } from '../../interfaces/BanOptions';
import type { TimeoutOptions } from '../../interfaces/TimeoutOptions';
import { PrivMSGUser } from '../PrivMSG/PrivMSGUser';
import type { PrivMSGChannel } from './PrivMSGChannel';
import { Chatter } from '../Chatter';
import { Ban } from '../Ban';


/**
 * Represents the chatter that sent the replied message of the PrivMSG.
 */
export class PrivMSGRepliedMessageChatter{

  /**
     * @description The current instance of the {@link ChatBot}.
     */
  public chatbot: ChatBot;

  /**
     * @description The channel where the chatter sent the message. 
     */
  public channel: PrivMSGChannel;

  /**
     * @private
     * @description The tags received from the Twitch IRC server, which are used to access to those tags outside the class constructor.
     */ 
  private tags: PrivMSGTags;

  /**
     * @description The user's id of the chatter.
     */
  public id: string;

  /**
     * @description The login name of this chatter.
     */

  public login: string;

  /**
     * @description The user's name that is displayed in the chat. This name is like the login but can have UpperCase letters.
     */

  public displayName: string;

  /**
     * @description The user of this chatter.
     */
  public user: PrivMSGUser;

  /**
     * 
     * @param chatbot 
     * @param tags 
     * @param channel 
     */
  public constructor(chatbot: ChatBot, tags: PrivMSGTags, channel: PrivMSGChannel){

    this.chatbot = chatbot;
    this.channel = channel;
    this.id = tags['reply-parent-user-id'];
    this.login = tags['reply-parent-user-login'];
    this.displayName = tags['reply-parent-display-name'];
    this.user = new PrivMSGUser(this.chatbot, tags);
    this.tags = tags;

  }

  /**
     * Ban the chatter from the chat of the channel.
     * @param {BanOptions} options The {@link BanOptions options} that you can complete to ban the user. 
     * @returns {Ban} Returns a {@link Ban} class that represents the ban.
     */
  public async ban(options?: BanOptions): Promise<Ban>{
        
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

  /**
     * Get the complete chatter information.
     * @returns {Chatter} Returns the complete chatter information including the complete channel.
     */
  public async fetch() {

    return new Chatter(this.chatbot, this.tags, await this.channel.fetch());
  }
}