import type { PostBanData, PostBanBody } from '@twitchapi/api-types';
import type { BanOptions } from '../interfaces';

export class BanBody implements PostBanBody{
  public data: PostBanData;
  public constructor(options: BanOptions){
        
    this.data = { user_id: options.userID, reason: options.reason ?? null };
        
  }
}