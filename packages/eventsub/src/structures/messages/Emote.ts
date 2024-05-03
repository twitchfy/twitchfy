import type { EmoteFormat } from '@twitchfy/api-types';
import type { EmoteData } from '../../interfaces';

/**
 * An emote sent into the fragments of a ChannelChatMessage event.
 */
export class Emote {

  /**
   * The ID of the emote.
   */
  public readonly id: string;

  /**
   * The ID of the set which contains the emote.
   */
  public readonly setId: string;

  /**
   * The ID of the owner of the emote.
   */
  public readonly ownerId: string;

  /**
   * The format of the emote. Possible values are: static or animated.
   */
  public readonly format: EmoteFormat[];

  /**
   * Builds up an emote.
   * @param data The data of the emote.
   */
  public constructor(data: EmoteData){

    this.id = data.id;

    this.setId = data.emote_set_id;

    this.ownerId = data.owner_id;

    this.format = data.format;

  }
}