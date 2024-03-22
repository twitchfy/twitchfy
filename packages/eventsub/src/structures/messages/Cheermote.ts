import type { CheermoteData } from '../../interfaces';

export class Cheermote implements CheermoteData {

  public prefix: string;

  public bits: number;

  public tier: number; 

  public constructor(cheermote: CheermoteData){

    this.prefix = cheermote.prefix;
    this.bits = cheermote.bits;
    this.tier = cheermote.tier;

  }
}