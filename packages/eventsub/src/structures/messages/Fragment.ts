import { Cheermote } from './Cheermote';
import { Emote } from './Emote';
import { Mention } from './Mention';
import type { FragmentData } from '../../interfaces';
import type { FragmentTypes } from '../../types';

/**
 * A fragment of a message.
 */
export class Fragment<T extends FragmentTypes = FragmentTypes> {

  /**
   * The type of the fragment.
   */
  public readonly type: T;
  /**
   * The content of the fragment.
   */
  public readonly content: string;
  /**
   * The cheermote in the fragment. Null if the fragment's type isn't cheermote.
   */
  public readonly cheermote: T extends 'cheermote' ? Cheermote : null;
  /**
   * The emote in the fragment. Null if the fragment's type isn't emote.
   */
  public readonly emote: T extends 'emote' ? Emote : null;
  /**
   * The mention in the fragment. Null if the fragment's type isn't mention.
   */
  public readonly mention: T extends 'mention' ? Mention : null;

  /**
   * Builds up a fragment.
   * @param data The data of the fragment.
   */
  public constructor(data: FragmentData<T>){

    this.type = data.type as T;

    this.content = data.text;

    this.cheermote = (data.cheermote ? new Cheermote(data.cheermote) : null) as T extends 'cheermote' ? Cheermote : null;

    this.emote = (data.emote ? new Emote(data.emote) : null) as T extends 'emote' ? Emote : null ;

    this.mention = (data.mention ? new Mention(data.mention) : null) as T extends 'mention' ? Mention : null;

  }

}