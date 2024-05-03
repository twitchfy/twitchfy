import { MentionUser } from './MentionUser';
import type { MentionData } from '../../interfaces';

/**
 * A mention sent into the fragments of a ChannelChatMessage event .
 */
export class Mention {

  /**
   * The user which was mentioned.
   */
  public readonly user: MentionUser;

  /**
   * Builds up a mention.
   * @param data The data of the mention.
   */
  public constructor(data: MentionData){

    this.user = new MentionUser({ id: data.user_id, login: data.user_login, display_name: data.user_name });

  }

}