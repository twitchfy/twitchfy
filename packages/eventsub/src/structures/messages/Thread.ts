import { UncompleteMessage } from './UncompleteMessage';
import { UncompleteUser } from './UncompleteUser';
import type { ReplyData } from '../../interfaces';

export class Thread {

  public message: UncompleteMessage;

  public user: UncompleteUser;

  public constructor(data: ReplyData){

    this.message = new UncompleteMessage(data.parent_message_id, data.parent_message_body);

    this.user = new UncompleteUser(data.parent_user_id, data.parent_user_login, data.parent_user_name);

  }



}