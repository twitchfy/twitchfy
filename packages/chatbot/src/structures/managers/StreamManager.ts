import type { Channel } from '../Channel';
import type { ChatBot } from '../../ChatBot';
import type { PrivMSGChannel } from '../PrivMSG/PrivMSGChannel';
import type { ClearChatChannel } from '../ClearChat/ClearChatChannel';
import { Stream } from '../Stream';

/**
 * @class
 * Represents the StreamManager of a channel.
 */
export class StreamManager{

  /**
    * @description The current instance of the {@link ChatBot}.
    */
  public chatbot: ChatBot;

  /**
    * @description The StreamManager {@link Channel}.
    */
  public channel: Channel | PrivMSGChannel | ClearChatChannel;

  /**
    * 
    * @param chatbot 
    * @param channel 
    */
  public constructor(chatbot: ChatBot, channel: Channel | PrivMSGChannel | ClearChatChannel){
    this.chatbot = chatbot;
    this.channel = channel;
    
  }

  /**
    * Obtain the current stream of the channel.
    * @returns {Promise<Stream>} Returns the channel stream if any.
    */
   
  public async fetch(){

    const data = await this.chatbot.helixClient.getStream(this.channel.id);

    if(!data) return null;

    return new Stream(this.chatbot, data);
  }
}
