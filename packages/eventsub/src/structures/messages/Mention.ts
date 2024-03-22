import { MentionUser } from './MentionUser';
import type { MentionData } from '../../interfaces';

export class Mention {

  public user: MentionUser;

  public constructor(data: MentionData){

    this.user = new MentionUser(data.user_id, data.user_login, data.user_name);

  }

}