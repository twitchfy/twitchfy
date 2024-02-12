import type { PostBanData, PostBanBody } from '@twitchapi/api-types';
import type { TimeoutOptions } from '../interfaces';

export class TimeoutBody implements PostBanBody{
  public data: PostBanData;
  public constructor(options: TimeoutOptions){

    this.data = { user_id: options.userID, duration: options.duration, reason: options.reason ?? null };

  }
}