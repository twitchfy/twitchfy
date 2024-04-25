import type { PatchChatSettingsBody } from '@twitchfy/api-types';
import { Base } from '../Base';
import type { ChatRoom } from '../ChatRoom';
import type { ChatBot } from '../ChatBot';
import { ChatRoomSettings } from '../ChatRoomSettings';
import type { EventSubConnection } from '../../enums';

/**
 * Represents the manager for the settings of a chatroom.
 */
export class ChatRoomSettingsManager<T extends EventSubConnection> extends Base<T>{

  /**
   * The settings' chatroom.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * Creates a new instance of the chatroom settings manager.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The settings' chatroom.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
  }

  /**
   * Edits the chatroom settings with the API.
   * @param options The options to edit the chatroom settings.
   * @returns The new settings of the chatroom.
   */
  public async edit(options: PatchChatSettingsBody){
    return new ChatRoomSettings(this.chatbot, this.chatroom, await this.chatbot.helixClient.updateChatSettings(this.chatroom.id, this.chatbot.userID, options));
  }

  /**
   * Fetches the current settings of the chatroom from the API.
   * @returns The current settings of the chatroom.
   */
  public async fetch(){
    return new ChatRoomSettings(this.chatbot, this.chatroom, await this.chatbot.helixClient.getChatSettings(this.chatroom.id, this.chatbot.userID));
  }

}