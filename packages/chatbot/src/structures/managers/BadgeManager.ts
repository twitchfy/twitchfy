import type { Badge } from '@twitchapi/eventsub';
import type { ChatBot } from '../ChatBot';
import { Base } from '../Base';
import type { EventSubConnection } from '../../enums';

/**
 * Represents an user badge's manager.
 */
export class BadgeManager<T extends EventSubConnection> extends Base<T>{

  /**
   * The data containing the user's badges returned by the EventSub.
   * @internal
   */
  private data: Badge[];
  
  /**
   * Creates a new instance of the badge manager.
   * @param chatbot The current instance of the chatbot.
   * @param data The data containing the user's badges returned by the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: Badge[]){
    super(chatbot);
    this.data = data;
  }

  /**
   * Checks if the user has a specific badge.
   * @param id The id of the badge to check. Possible values could be `subscriber`, `vip, `moderator`.
   * @returns A boolean determining whether the user has the badge.
   */
  public has(id: string){
    return !!this.get(id);
  }

  /**
   * Gets a user's badge.
   * @param id The id of the badge to get. Possible values could be `subscriber`, `vip, `moderator`.
   * @returns The badge if the user has it. If not it will return `undefined`.
   */
  public get(id: string){
    return this.data.find(badge => badge.setId.toLowerCase() === id.toLowerCase());
  }
}