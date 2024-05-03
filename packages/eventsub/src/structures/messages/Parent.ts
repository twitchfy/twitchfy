import { UncompleteMessage } from './UncompleteMessage';
import { UncompleteUser } from './UncompleteUser';
import type { ReplyData } from '../../interfaces';

/**
 * The parent message which was replied by the message received within the ChannelChatMessage event.
 */
export class Parent {

  /**
   * The parent message which was replied.
   */
  public readonly message: UncompleteMessage;

  /**
   * The user who sent the parent message.
   */
  public user: UncompleteUser;

  /**
   * Builds up a parent message.
   * @param data The data of the reply.
   */
  public constructor(data: ReplyData){

    this.message = new UncompleteMessage({ id: data.parent_message_id, content: data.parent_message_body });

    this.user = new UncompleteUser({ id: data.parent_user_id, login: data.parent_user_login, display_name: data.parent_user_name });

  }



}