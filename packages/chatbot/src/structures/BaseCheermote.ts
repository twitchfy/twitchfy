import type { Cheermote as CheermoteData } from '@twitchfy/eventsub';
import { Cheermote } from './Cheermote';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';

/**
 * Represents a base cheermote returned by the EventSub.
 */
export class BaseCheermote<T extends EventSubConnection> extends Base<T> {

  /**
   * The bits that were cheered with the cheermote.
   */
  public readonly bits: number;

  /**
   * The prefix of the cheermote.
   */
  public readonly prefix: string;

  /**
   * The tier level of the cheermote.
   */
  public readonly tier: number;

  /**
   * The data of the cheermote returned by the EventSub.
   */
  private data: CheermoteData & { broadcaster_id: string };

  /**
   * Creates a new instance of the base cheermote.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the cheermote returned by the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: CheermoteData & { broadcaster_id: string }){
    super(chatbot);
    this.data = data;
    this.bits = data.bits;
    this.prefix = data.prefix;
    this.tier = data.tier;
  }

  /**
   * The content of the cheermote. This is the prefix followed by the bits cheered.
   */
  public get content(){
    return this.data.prefix + this.data.bits;
  }

  /**
   * Fetches the cheermote from the API returning the information of it.
   * @returns The cheermote if it exists. If not it will return `null` (basically this is 99.99% impossible).
   */
  public async fetch(){
    const cheermoteData = await this.chatbot.helixClient.getCheermotes(this.data.broadcaster_id);
    const cheermote = cheermoteData.find((x) => x.prefix === this.data.prefix);
    if(!cheermote) return null;
    return new Cheermote<T>(this.chatbot, cheermote);
  }

}