import type { PutAutoModSettingsBody } from '@twitchapi/api-types';
import type { AutoMod } from '../AutoMod';
import { AutoModSettings } from '../AutoModSettings';
import type { ChatBot } from '../ChatBot';
import { Base } from '../Base';
import type { EventSubConnection } from '../../enums';

/**
 * Represents the manager for the settings of the autmod.
 */
export class AutoModSettingsManager<T extends EventSubConnection> extends Base<T> {

  /**
   * The automod instance.
   */
  public automod: AutoMod<T>;

  /**
   * Creates a new instance of the automod settings manager.
   * @param chatbot The current instance of the chatbot.
   * @param automod The automod instance.
   */
  public constructor(chatbot: ChatBot<T>, automod: AutoMod<T>){
    super(chatbot);
    this.automod = automod;
  }

  /**
   * Edits the automod settings.
   * @param options The options to edit the automod settings.
   * @returns The new settings of the automod.
   */
  public async edit(options: PutAutoModSettingsBody){
    return new AutoModSettings(this.chatbot, this.automod, await this.chatbot.helixClient.updateAutoModSettings(this.automod.chatroom.id, this.chatbot.userID, options));
  }

  /**
   * Fetches the current settings of the automod from the API.
   * @returns The current settings of the automod.
   */
  public async fetch(){
    return new AutoModSettings(this.chatbot, this.automod, await this.chatbot.helixClient.getAutoModSettings(this.automod.chatroom.id, this.chatbot.userID));
  }

}