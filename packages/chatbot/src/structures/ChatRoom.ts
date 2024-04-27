import type { AnnouncementOptions } from '@twitchfy/helix';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import { BaseUser } from './BaseUser';
import { AutoMod } from './AutoMod';
import { BaseChannel } from './BaseChannel';
import { MessageManager, BanManager, TimeoutManager, ChatRoomSettingsManager } from './managers';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch chatroom of a channel.
 */
export class ChatRoom<T extends EventSubConnection> extends Base<T> {

  /**
   * The broadcaster who owns the chatroom.
   */
  public readonly broadcaster: BaseUser<T>;

  /**
   * The channel of the chatroom.
   */
  public readonly channel: BaseChannel<T>;

  /**
   * The ban manager of the chatroom.
   */
  public readonly bans: BanManager<T>;

  /**
   * The timeout manager of the chatroom.
   */
  public readonly timeouts: TimeoutManager<T>;

  /**
   * The settings manager of the chatroom.
   */
  public readonly settings: ChatRoomSettingsManager<T>;

  /**
   * The automod manager of the chatroom.
   */
  public readonly automod: AutoMod<T>;

  /**
   * The message manager of the chatroom.
   */
  public readonly messages: MessageManager<T>;

  /**
   * The data of the chatroom.
   */
  private data: ChatRoomData;

  /**
   * Creates a new instance of the chatroom.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the chatroom.
   */
  public constructor(chatbot: ChatBot<T>, data: ChatRoomData){
    super(chatbot);
    this.data = data;
    this.broadcaster = new BaseUser<T>(chatbot, { id: data.broadcaster_id, login: data.broadcaster_login, display_name: data.broadcaster_name});
    this.channel = new BaseChannel<T>(chatbot, data, this);
    this.bans = new BanManager<T>(this.chatbot, this);
    this.timeouts = new TimeoutManager<T>(this.chatbot, this);
    this.settings = new ChatRoomSettingsManager<T>(this.chatbot, this);
    this.messages = new MessageManager<T>(this.chatbot, this);
    this.automod = new AutoMod<T>(this.chatbot, this);
  }

  /**
   * The Id of the chatroom. Its id is the same as the broadcaster id.
   */
  public get id(){
    return this.data.broadcaster_id;
  }

  /**
   * Sends a message to the chatroom.
   * @param message The message to send.
   * @returns The message that was sent. See {@link BaseMessage}
   */
  public async send(message: string){
    return await this.chatbot.messages.send(this.id, message);
  }

  /**
   * Sets the slow mode of the chatroom.
   * @param duration The duration of the slow mode in seconds. If null, it will disable the slow mode.
   * @returns The updated settings of the chatroom.
   */
  public async setSlowMode(duration: number | null){
    return await this.settings.edit({ slow_mode: !!duration, slow_mode_wait_time: duration });
  }

  /**
   * Sets the followers mode of the chatroom.
   * @param duration The time, in seconds, the followers must be following the broadcaster to be able to send a message. If null, it will disable the followers mode.
   * @returns The updated settings of the chatroom.
   */
  public async setFollowersMode(duration: number | null){
    return await this.settings.edit({ follower_mode: !!duration, follower_mode_duration: duration! / 60 });
  }

  /**
   * Sets the subscribers mode of the chatroom.
   * @param enabled Whether the subscribers mode is enabled.
   * @returns The updated settings of the chatroom.
   */
  public async setSubscribersMode(enabled: boolean){
    return await this.settings.edit({ subscriber_mode: enabled });
  }

  /**
   * Sets the unique messages mode of the chatroom.
   * @param enabled Whether the unique messages mode is enabled.
   * @returns The updated settings of the chatroom.
   */
  public async setUniqueMessagesMode(enabled: boolean){
    return await this.settings.edit({ unique_chat_mode: enabled });
  }

  /**
   * Sets the chat delay of the chatroom.
   * @param duration The duration of the chat delay in seconds. If null, it will disable the chat delay.
   * @returns The updated settings of the chatroom.
   */
  public async setChatDelay(duration: 2 | 4 | 6 | null){
    return await this.settings.edit({ non_moderator_chat_delay: !!duration, non_moderator_chat_delay_duration: duration! });
  }

  /**
   * Sets the emote only mode of the chatroom.
   * @param enabled Whether the emote only mode is enabled.
   * @returns The updated settings of the chatroom.
   */
  public async setEmoteOnlyMode(enabled: boolean){
    return await this.settings.edit({ emote_mode: enabled });
  }

  /**
   * Sends an announcement to the chatroom.
   * @param options The options of the announcement. See {@link AnnouncementOptions}
   * @returns The announcement that was sent.
   */
  public async announce(options: AnnouncementOptions){
    return await this.chatbot.helixClient.sendAnnouncement(this.id, this.chatbot.userId, options);
  }

  /**
   * Sends a shoutout to a user in the chatroom.
   * @param receiverId The Id of the user to shoutout.
   * @returns The shoutout that was sent.
   */
  public async shoutout(receiverId: string){
    return await this.chatbot.helixClient.sendShoutout(this.id, receiverId, this.chatbot.userId);
  }
}

/**
 * The data of the chatroom.
 * @param broadcaster_id The Id of the broadcaster.
 * @param broadcaster_name The name of the broadcaster.
 * @param broadcaster_login The login of the broadcaster.
 */
export interface ChatRoomData {
  broadcaster_id: string;
  broadcaster_name: string;
  broadcaster_login: string;
}

