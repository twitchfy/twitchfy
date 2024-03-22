import type { EmoteData } from '../../interfaces';
import type { EmoteFormat } from '../../types';

export class Emote {

  public id: string;

  public setId: string;

  public ownerId: string;

  public format: EmoteFormat[];

  public constructor(data: EmoteData){

    this.id = data.id;

    this.setId = data.emote_set_id;

    this.ownerId = data.owner_id;

    this.format = data.format;

  }
}