import type { CheermoteData } from '../../interfaces';

/**
 * A cheermote sent into the fragments of a ChannelChatMessage event.
 */
export class Cheermote implements CheermoteData {

  /**
   * The prefix of the cheermote.
   */
  public readonly prefix: string;

  /**
   * The amount of bits the cheermote represents.
   */
  public readonly bits: number;

  /**
   * The tier of the cheermote.
   */
  public readonly tier: number; 

  /**
   * Builds up a cheermote.
   * @param cheermote The data of the cheermote.
   */
  public constructor(cheermote: CheermoteData){

    this.prefix = cheermote.prefix;
    this.bits = cheermote.bits;
    this.tier = cheermote.tier;

  }
}