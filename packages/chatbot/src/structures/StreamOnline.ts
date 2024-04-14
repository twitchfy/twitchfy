import type { StreamOnlineMessage } from '@twitchapi/eventsub';
import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import { BaseStream } from './BaseStream';
import { BaseUser } from './BaseUser';
import type { EventSubConnectionMap } from '../interfaces';
import type { EventSubConnection } from '../enums';

/**
 * Represents a stream online event.
 */
export class StreamOnline<T extends EventSubConnection> extends Base<T> {
     
  /**
   * The broadcaster of the channel whose stream went online.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The stream which went online.
   */
  public readonly stream: BaseStream<T>;

  /**
   * The data of the stream online event returned from the EventSub.
   */
  private data: StreamOnlineMessage<EventSubConnectionMap[T]>;

  /**
   * Creates a new instance of the stream online event.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the stream online event returned from the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: StreamOnlineMessage<EventSubConnectionMap[T]>){
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { ...data.broadcaster, display_name: data.broadcaster.displayName });
    this.stream = new BaseStream<T>(chatbot, { ...data.stream, started_at: data.stream.startedAt.toISOString(), user_id: data.broadcaster.id, user_login: data.broadcaster.login, user_name: data.broadcaster.displayName });
  }

  /**
   * The ID of the broadcaster whose stream went online.
   */
  public get broadcasterID(){
    return this.data.broadcaster.id;
  }

  /**
   * The ID of the chatroom where the stream went online.
   */
  public get chatroomID(){
    return this.data.broadcaster.id;
  }

  /**
   * Returns the time when the stream went online. A JavaScript Date object is returned.
   */
  public get startedAt(){
    return this.data.stream.startedAt;
  }
}