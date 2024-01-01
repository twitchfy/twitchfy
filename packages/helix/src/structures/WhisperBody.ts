import { PostWhisperBody } from '@twitchapi/api-types';

export class WhisperBody implements PostWhisperBody{
  public message: string;
  public constructor(message: string){
    this.message = message;       
  }
}