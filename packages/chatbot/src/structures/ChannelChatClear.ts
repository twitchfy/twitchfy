import type { ChannelChatClearMessage } from '@twitchapi/eventsub';
import { Base } from './Base';
import { BaseUser } from './BaseUser';
import type { ChatBot } from './ChatBot';
import type { EventSubConnection } from '../enums';
import type { EventSubConnectionMap } from '../interfaces';

/**
 * Represents a channel chat clear event. 
 */
export class ChannelChatClear<T extends EventSubConnection> extends Base<T> {

  /**
   * The broadcaster of the channel whose chat was cleared.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The data of the chat clear event returned from the EventSub.
   */
  private data: ChannelChatClearMessage<EventSubConnectionMap[T]>;

  /**
   * Creates a new instance of the channel chat clear event.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the chat clear event returned from the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: ChannelChatClearMessage<EventSubConnectionMap[T]>) {
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { ...data.broadcaster, display_name: data.broadcaster.displayName });
  }

  /**
   * The ID of the broadcaster whose chat was cleared.
   */
  public get broadcasterID(){
    return this.data.broadcaster.id;
  }

  /**
   * The ID of the chatroom where the chat was cleared.
   */
  public get chatroomID() {
    return this.data.broadcaster.id;
  }
}