import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { ChatRoom } from './ChatRoom';
import { AutoModSettingsManager } from './managers';
import type { EventSubConnection } from '../enums';

/**
 * Represents the automod of a chatroom.
 */
export class AutoMod<T extends EventSubConnection> extends Base<T>{

  /**
   * The chatroom where the automod is.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * The settings manager of the automod.
   */
  public readonly settings: AutoModSettingsManager<T>;

  /**
   * Creates a new instance of the automod.
   * @param chatbot The current instance of the chatbot.
   * @param chatroom The chatroom where the automod is.
   */
  public constructor(chatbot: ChatBot<T>, chatroom: ChatRoom<T>){
    super(chatbot);
    this.chatroom = chatroom;
    this.settings = new AutoModSettingsManager<T>(chatbot, this);
  }

  /**
   * Sets the overall level of the automod. This setting will overwrite all the others.
   * @param level The overall level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setOverall(level: number | null) {
    return await this.settings.edit({ overall_level: level ?? 0 });
  }

  /**
   * Sets the disability level of the automod. This settings will disable the overall level.
   * @param level The disability level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setDisability(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, disability: level ?? 0 });
  }

  /**
   * Sets the aggression level of the automod. This settings will disable the overall level.
   * @param level The aggression level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setAggression(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, aggression: level ?? 0 });
  }

  /**
   * Sets the sexuality level of the automod. This settings will disable the overall level.
   * @param level The sexuality level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setSexuality(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, sexuality_sex_or_gender: level ?? 0 });
  }

  /**
   * Sets the misogyny level of the automod. This settings will disable the overall level.
   * @param level The misogyny level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setMisogyny(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, misogyny: level ?? 0 });
  }

  /**
   * Sets the bullying level of the automod. This settings will disable the overall level.
   * @param level The bullying level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setBullying(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, bullying: level ?? 0 });
  }

  /**
   * Sets the harassment level of the automod. This settings will disable the overall level.
   * @param level The harassment level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setSwearing(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, swearing: level ?? 0 });
  }

  /**
   * Sets the racism level of the automod. This settings will disable the overall level.
   * @param level The racism level of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setRacism(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, race_ethnicity_or_religion: level ?? 0 });
  }

  /**
   * Sets the level of sex based terms of the automod. This settings will disable the overall level.
   * @param level The level of sex based terms of the automod. If null, it will be set to 0.
   * @returns The new settings of the automod.
   */
  public async setSexBasedTerms(level: number | null) {
    const settingsData = await this.settings.fetch();
    const { overall_level, ...rest } = settingsData.data;
    return await this.settings.edit({ ...rest, sex_based_terms: level ?? 0 });
  }

}