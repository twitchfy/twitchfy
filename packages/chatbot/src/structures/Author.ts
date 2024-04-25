import type { Badge } from '@twitchfy/eventsub';
import type { BaseUserData } from './BaseUser';
import { BaseUser } from './BaseUser';
import type { ChatBot } from './ChatBot';
import { BadgeManager } from './managers';
import type { EventSubConnection } from '../enums';

/**
 * Represents the author of a received message.
 * @extends {BaseUser}
 */
export class Author<T extends EventSubConnection> extends BaseUser<T>{

  /**
   * The name color of the author in HEX RGB format.
   */
  public readonly color: string;

  /**
   * The set of badges of the author.
   */
  public readonly badges: BadgeManager<T>;

  /**
   * Creates a new instance of the author.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the user.
   */
  public constructor(chatbot: ChatBot<T>, data: BaseUserData & { badges: Badge[], color: string }){
    super(chatbot, data);
    this.badges = new BadgeManager<T>(chatbot, data.badges);
  }

  /**
   * Checks if the author is the broadcaster of the chatroom.
   */
  public get broadcaster(){
    return this.badges.has('broadcaster');
  }

  /**
   * Checks if the author is a moderator of the chatroom.
   */
  public get moderator(){
    return this.badges.has('moderator');
  }

  /**
   * Checks if the author is a VIP of the chatroom.
   */
  public get vip(){
    return this.badges.has('vip');
  }

  /**
   * Checks if the author is a subscriber of the channel.
   */
  public get subscriber(){
    return this.badges.has('subscriber');
  }

  /**
   * Gets the subscription tier of the author. If the author is not a subscriber, it will return a nullish value.
   */
  public get subscriptionTier(){
    const badge = this.badges.get('subscriber');
    if(!badge) return null;
    return Number(badge.id[0]);
  }

  /**
   * Gets the subscription months of the author. If the author is not a subscriber, it will return `0`.
   */
  public get subscriptionMonths(){
    const badge = this.badges.get('subscriber');
    if(!badge) return 0;
    return Number(badge.info);
  }

}