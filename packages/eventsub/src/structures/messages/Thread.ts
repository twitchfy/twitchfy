import { UncompleteUser } from './UncompleteUser';
import type { ReplyData } from '../../interfaces';

export class Thread {

  public messageId: string;

  public user: UncompleteUser;

  public constructor(data: ReplyData){

    this.messageId = data.thread_message_id;

    this.user = new UncompleteUser(data.thread_user_id, data.thread_user_login, data.thread_user_name);

  }



}