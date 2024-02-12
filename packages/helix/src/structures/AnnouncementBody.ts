import type { AnnouncementOptions } from '../interfaces';
import type { AnnouncementColor } from '../enums';

export class AnnouncementBody{
  public message: string;
  public color: AnnouncementColor;
  public constructor(options: AnnouncementOptions){
    this.message = options.message;
    this.color = options.color;
  }
}