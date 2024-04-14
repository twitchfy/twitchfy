import type { Cheermote as CheermoteData, CheermotesType } from '@twitchapi/api-types';
import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import { CheermoteTier } from './CheermoteTier';
import type { CheermoteURLOptions } from '../interfaces';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch cheermote.
 */
export class Cheermote<T extends EventSubConnection> extends Base<T> {

  /**
   * The type of the cheermote.
   */
  public readonly type: CheermotesType;

  /**
   * The prefix of the cheermote.
   */
  public readonly prefix: string;

  /**
   * The tiers of the cheermote.
   */
  public readonly tiers: CheermoteTier<T>[];

  /**
   * Whether the cheermote is charitable.
   */
  public readonly isCharitable: boolean;

  /**
   * The data of the cheermote returned from the API.
   */
  private data: CheermoteData;
    
  /**
   * Creates a new instance of the cheermote.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the cheermote returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: CheermoteData){
    super(chatbot);
    this.data = data;
    this.type = data.type;
    this.prefix = data.prefix;
    this.tiers = data.tiers.map(x => new CheermoteTier<T>(chatbot, this, x));
    this.isCharitable = data.is_charitable;
  }

  /**
   * Returns the last updated date of the cheermote in a JavaScript Date object.
   */
  public get lastUpdated(){
    return new Date(this.data.last_updated);
  }

  /**
   * Get the URL of the image of cheermote.
   * @param options The options to get the URL of the cheermote.
   * @returns The URL of the image of the cheermote.
   */
  public getURL(options: CheermoteURLOptions){
    return this.tiers.find((x) => x.id === options.tier)?.getURL(options) ?? null; 
  }
}