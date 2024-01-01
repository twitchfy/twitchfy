import { PostCreateClip } from '@twitchapi/api-types';
import { ChatBot } from '../ChatBot';

export class CreatedClip{

  /**
     * @description The current instance of the {@link ChatBot}
     */
  public chatbot: ChatBot;

  /**
     * @description The unique identifier of the clip.
     */
  public id: string;

  /**
     * @description The Twitch's url of the clip.
     */
  public url: string;

  /**
     * 
     * @param chatbot 
     * @param data 
     */
  public constructor(chatbot: ChatBot, data: PostCreateClip){


    this.chatbot = chatbot;
    this.id = data.id;
    this.url = data.edit_url.slice(0, -4);

  }
}