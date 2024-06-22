import type { Warning as WarningData } from '@twitchfy/api-types';
import type { ChatBot } from './ChatBot';
import { Base } from './Base';
import type { EventSubConnection } from '../enums';

/**
 * Represents a warning.
 */
export class Warning<T extends EventSubConnection> extends Base<T> {

  /**
     * The data of the warning returned by the API.
     */
  private data: WarningData;

  /**
     * Creates a new instance of a warning.
     * @param chatbot The current instance of the chatbot.
     * @param data The data of the warning returned by the API.
     */
  public constructor(chatbot: ChatBot<T>, data: WarningData) {
    super(chatbot);
    this.data = data;
  }

  /**
     * The Id of the channel's broadcaster where the user received the warning.
     */
  public get broadcasterId() {
    return this.data.broadcaster_id;
  }

  /**
     * The Id of the chatroom where the warning was received.
     */
  public get chatroomId() {
    return this.data.broadcaster_id;
  }

  /**
     * The Id of the user who received the warning.
     */

  public get userId() {
    return this.data.user_id;
  }

  /**
     * The Id of the moderator who warned the user.
     */

  public get moderatorId() {
    return this.data.moderator_id;
  }

  /**
     * The reason for the warning.
     */

  public get reason() {
    return this.data.reason;
  }
}