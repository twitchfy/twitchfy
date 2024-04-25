import type { PostWhisperBody } from '@twitchfy/api-types';

export class WhisperBody implements PostWhisperBody{
  public message: string;
  public constructor(message: string){
    this.message = message;       
  }
}