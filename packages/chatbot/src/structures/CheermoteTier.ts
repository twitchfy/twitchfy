import type { CheermoteTier as CheermoteTierData } from '@twitchfy/api-types';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { Cheermote } from './Cheermote';
import type { EventSubConnection } from '../enums';
import type { CheermoteURLOptions } from '../interfaces';

/**
 * Represents a Twitch cheermote tier.
 */
export class CheermoteTier<T extends EventSubConnection> extends Base<T> {

  /**
   * The cheermote of the tier.
   */
  public readonly cheermote: Cheermote<T>;

  /**
   * Whether the user can cheer with this tier.
   */
  public readonly canCheer: boolean;

  /**
   * The color of the tier.
   */
  public readonly color: string;

  /**
   * The minimum bits necessary to cheer with this tier.
   */
  public readonly minBits: number;

  /**
   * Whether the tier should be shown in the bits card.
   */
  public readonly showInBitsCard: boolean;

  /**
   * The data of the cheermote tier returned from the API.
   */
  private data: CheermoteTierData;

  /**
   * Creates a new instance of the cheermote tier.
   * @param chatbot The current instance of the chatbot.
   * @param cheermote The cheermote of the tier.
   * @param data The data of the cheermote tier returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, cheermote: Cheermote<T>, data: CheermoteTierData){
    super(chatbot);
    this.data = data;
    this.cheermote = cheermote;
    this.canCheer = data.can_cheer;
    this.color = data.color;
    this.minBits = data.min_bits;
    this.showInBitsCard = data.show_in_bits_card;
  }

  /**
   * The Id of the cheermote tier.
   */
  public get id(){
    return Number(this.data.id);
  }

  
  /**
   * Get the URL of the image of the cheermote tier.
   * @param options The options to get the URL of the cheermote tier.
   * @returns The URL of the image of the cheermote tier.
   */
  public getURL(options?: Omit<CheermoteURLOptions, 'tier'>){
    return this.data.images[options?.theme ?? 'light'][options?.format ?? 'static'][options?.size ?? '1'];
  }


}