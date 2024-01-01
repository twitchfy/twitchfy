import { PostBanData, PostBanBody } from '@twitchapi/api-types';

export class TimeoutBody implements PostBanBody{
  public data: PostBanData;
  public constructor(user_id: string, duration: number, reason?: string){

    this.data = { user_id, duration, reason: reason ?? null };

  }
}