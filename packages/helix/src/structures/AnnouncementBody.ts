import type { PostAnnouncementBody } from '@twitchfy/api-types';
import type { AnnouncementOptions } from '../interfaces';
import type { AnnouncementColor } from '../enums';

export class AnnouncementBody implements PostAnnouncementBody{
  public message: string;
  public color: AnnouncementColor;
  public constructor(options: AnnouncementOptions){
    this.message = options.message;
    this.color = options.color;
  }
}