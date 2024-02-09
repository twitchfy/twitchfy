import type { AnnouncementColor } from '../enums';

export class AnnouncementBody{
  public message: string;
  public color: AnnouncementColor;
  public constructor(message: string, color: AnnouncementColor){
    this.message = message;
    this.color = color;
  }
}