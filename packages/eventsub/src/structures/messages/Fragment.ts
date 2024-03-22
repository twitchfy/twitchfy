import { Cheermote } from './Cheermote';
import { Emote } from './Emote';
import { Mention } from './Mention';
import type { FragmentData } from '../../interfaces';
import type { FragmentTypes } from '../../types';

export class Fragment<T extends FragmentTypes = FragmentTypes> {

  public type: T;
  public content: string;
  public cheermote: T extends 'cheermote' ? Cheermote : null;
  public emote: T extends 'emote' ? Emote : null;
  public mention: T extends 'mention' ? Mention : null;

  public constructor(data: FragmentData<T>){

    this.type = data.type as T;

    this.content = data.text;

    this.cheermote = (data.cheermote ? new Cheermote(data.cheermote) : null) as T extends 'cheermote' ? Cheermote : null;

    this.emote = (data.emote ? new Emote(data.emote) : null) as T extends 'emote' ? Emote : null ;

    this.mention = (data.mention ? new Mention(data.mention) : null) as T extends 'mention' ? Mention : null;

  }

}