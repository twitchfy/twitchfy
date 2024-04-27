import type { ChatSettings, PatchChatSettingsBody } from '@twitchfy/api-types';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { ChatRoom } from './ChatRoom';
import type { EventSubConnection } from '../enums';

/**
 * Represents the settings of a chatroom.
 */
export class ChatRoomSettings<T extends EventSubConnection> extends Base<T>{

  /**
   * The chatroom of the settings.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * The data representing the chat settings.
   */
  private data: ChatSettings;
    
  /**
   * Creates a new instance of the chatroom settings.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom of the settings.
   * @param data The data representing the chat settings.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>, data: ChatSettings){
    super(chatbot);
    this.data = data;
    this.chatroom = chatroom;
  }
    
  /**
   * Edits the chat settings of the chatroom.
   * @param options The options to edit the chat settings.
   * @returns The updated chatroom settings.
   */
  public async edit(options: PatchChatSettingsBody){
    return new ChatRoomSettings(this.chatbot, this.chatroom, await this.chatbot.helixClient.updateChatSettings(this.chatroom.id, this.chatbot.userId, options));
  }
    
  /**
   * The Id of the chatroom.
   */
  public get chatroomId(){
    return this.chatroom.id;
  }

  /**
   * Whether the chatroom is in emote only mode.
   */
  public get emotesOnly(){
    return this.data.emote_mode;
  }

  /**
   * The number of seconds a follower has to be following to be able to write. If the follower mode is disabled, this will return false.
   */
  public get followersOnly(){
    return this.data.follower_mode ? this.data.follower_mode_duration! * 60 : false;
  }

  /**
   * Whether the chatroom is in subscriber mode.
   */
  public get subscriberMode(){
    return this.data.subscriber_mode;
  }

  /**
   * Whether the chatroom is in unique messages mode.
   */
  public get uniqueMessagesMode(){
    return this.data.unique_chat_mode;
  }

  /**
   * The slow mode duration of the chatroom in seconds. If slow mode is disabled, this will return false.
   */
  public get slowMode(){
    return this.data.slow_mode ? this.data.slow_mode_wait_time : false;
  }

  /**
   * The duration of the chat delay in seconds. If chat delay is disabled, this will return false.
   */
  public get chatDelay(){
    return this.data.non_moderator_chat_delay ? this.data.non_moderator_chat_delay_duration : false;
  }
    
}