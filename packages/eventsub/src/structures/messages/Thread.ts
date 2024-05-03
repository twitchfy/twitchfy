import { UncompleteUser } from './UncompleteUser';
import type { ReplyData } from '../../interfaces';

/**
 * The first message of the reply thread received in the ChannelChatMessage event.
 */
export class Thread {

  /**
   * The ID of the message.
   */
  public readonly messageId: string;

  /**
   * The user who sent the message.
   */
  public readonly user: UncompleteUser;

  /**
   * Builds up a thread message.
   * @param data The data of the reply.
   */
  public constructor(data: ReplyData){

    this.messageId = data.thread_message_id;

    this.user = new UncompleteUser({ id: data.thread_user_id, login: data.thread_user_login, display_name: data.thread_user_name });

  }



}