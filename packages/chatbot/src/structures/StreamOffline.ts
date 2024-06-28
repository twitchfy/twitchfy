import type { StreamOfflineMessage } from '@twitchfy/eventsub';
import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import { BaseUser } from './BaseUser';
import type { EventSubConnectionMap } from '../interfaces';
import type { EventSubConnection } from '../enums';

/**
 * Represents a stream offline event.
 */
export class StreamOffline<T extends EventSubConnection> extends Base<T> {
     
  /**
   * The broadcaster of the channel whose stream went offline.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The data of the stream offline event returned from the EventSub.
   */
  private data: StreamOfflineMessage<EventSubConnectionMap[T]>;

  /**
   * Creates a new instance of the stream online event.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the stream online event returned from the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: StreamOfflineMessage<EventSubConnectionMap[T]>){
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { ...data.broadcaster, display_name: data.broadcaster.displayName });
  }

  /**
   * The Id of the broadcaster whose stream went offline.
   */
  public get broadcasterId(){
    return this.data.broadcaster.id;
  }

  /**
   * The Id of the chatroom where the stream went offline.
   */
  public get chatroomId(){
    return this.data.broadcaster.id;
  }

}