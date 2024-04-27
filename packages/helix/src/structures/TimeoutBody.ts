import type { PostBanData, PostBanBody } from '@twitchfy/api-types';
import type { TimeoutOptions } from '../interfaces';

export class TimeoutBody implements PostBanBody{
  public data: PostBanData;
  public constructor(options: TimeoutOptions){

    this.data = { user_id: options.userId, duration: options.duration, reason: options.reason ?? null };

  }
}