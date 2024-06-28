import type { WarnUserOptions } from '../interfaces';

export class WarnUserBody {
  data: WarnUserBodyData;
  public constructor(options: WarnUserOptions){
    this.data = {
      user_id: options.userId,
      reason: options.reason
    };
  }
}

export interface WarnUserBodyData {
    user_id: string
    reason: string
}