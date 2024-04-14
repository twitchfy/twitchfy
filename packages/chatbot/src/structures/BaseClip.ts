/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { GetClip, PostCreateClip } from '@twitchapi/api-types';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';

/**
 * Represents the base class for all clips.
 */
export class BaseClip<T extends EventSubConnection> extends Base<T> {

  /**
   * The id of the clip.
   */
  public readonly id: string;
    
  /**
   * The url of the clip.
   */
  public readonly url: string;

  /**
   * Creates a new instance of the clip.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the clip returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, data: PostCreateClip | GetClip){
    super(chatbot);
    this.id = data.id;
    // @ts-ignore
    this.url = data.url || data.edit_url.split('/edit')[0];
  }

  /**
   * 
   * @returns The url of the clip.
   */
  public override toString(){
    return this.url;
  }

  /**
   * Fetches the information of the clip from the API.
   * @returns The fetched clip. Returns null if the clip was not found (probably because it was not cached yet).
   */
  public async fetch(){
    return this.chatbot.clip({ id: this.id });
  }
}

/**
 * The base data of a clip.
 * @param id The id of the clip.
 * @param url The url of the clip.
 */
export interface BaseClipData {
    id: string
    url: string
}