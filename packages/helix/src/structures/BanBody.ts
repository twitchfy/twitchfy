import type { PostBanData, PostBanBody } from '@twitchfy/api-types';
import type { BanOptions } from '../interfaces';

export class BanBody implements PostBanBody{
  public data: PostBanData;
  public constructor(options: BanOptions){
        
    this.data = { user_id: options.userId, reason: options.reason ?? null };
        
  }
}