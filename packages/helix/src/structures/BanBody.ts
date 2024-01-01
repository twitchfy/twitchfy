import { PostBanData, PostBanBody } from '@twitchapi/api-types';

export class BanBody implements PostBanBody{
  public data: PostBanData;
  public constructor(user_id: string, reason?: string ){
        
    this.data = { user_id, reason: reason ?? null };
        
  }
}