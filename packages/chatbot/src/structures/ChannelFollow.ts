import type { ChannelFollowMessage } from '@twitchfy/eventsub';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import { BaseUser } from './BaseUser';
import type { EventSubConnection } from '../enums';
import type { EventSubConnectionMap } from '../interfaces';

/**
 * Represents a channel follow event.
 */
export class ChannelFollow<T extends EventSubConnection> extends Base<T> {
    
  /**
   * The broadcaster of the channel who was followed.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The follower who followed the channel.
   */
  public readonly follower: BaseUser<T>;

  /**
   * The date when the follower followed the channel.
   */
  public readonly followedAt: Date;

  /**
   * The data of the follow event returned from the EventSub.
   */
  private data: ChannelFollowMessage<EventSubConnectionMap[T]>;

  /**
   * Creates a new instance of the channel follow event.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the follow event returned from the EventSub.
   */
  public constructor(chatbot: ChatBot<T>, data: ChannelFollowMessage<EventSubConnectionMap[T]>){
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { ...data.broadcaster, display_name: data.broadcaster.displayName });
    this.follower = new BaseUser<T>(chatbot, { ...data.follower, display_name: data.follower.displayName });
    this.followedAt = data.followedAt;
  }

  /**
   * The Id of the broadcaster who was followed.
   */
  public get broadcasterId(){
    return this.data.broadcaster.id;
  }

  /**
   * The Id of the follower who followed the channel.
   */
  public get followerId(){
    return this.data.follower.id;
  }

  /**
   * The Id of the chatroom where the follow event occurred.
   */
  public get chatroomId(){
    return this.data.broadcaster.id;
  }
}