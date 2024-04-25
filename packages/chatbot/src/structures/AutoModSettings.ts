/* eslint-disable @typescript-eslint/no-unused-vars */

import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { AutoMod } from './AutoMod';
import type { EventSubConnection } from '../enums';
import type { AutoModSettings as AutoModSettingsData } from '@twitchfy/api-types';

/**
 * Represents the settings of an automod.
 */
export class AutoModSettings<T extends EventSubConnection> extends Base<T> {

  /**
   * The autmod whose settings are.
   */
  public readonly automod: AutoMod<T>;

  /**
   * The data of the settings returned from the API.
   */
  public data: AutoModSettingsData;

  /**
   * Creates a new instance of the automod settings.
   * @param chatbot The current instance of the chatbot.
   * @param automod The automod whose settings are.
   * @param data The data of the settings returned from the API.
   */
  public constructor(chatbot: ChatBot<T>, automod: AutoMod<T>, data: AutoModSettingsData) {
    super(chatbot);
    this.data = data;
    this.automod = automod;
  }

  /**
   * The overall level of the automod.
   */
  public get overall() {
    return this.data.overall_level;
  }

  /**
   * The disability level of the automod.
   */
  public get disability() {
    return this.data.disability;
  }

  /**
   * The aggression level of the automod.
   */
  public get aggression() {
    return this.data.aggression;
  }

  /**
   * The sexuality level of the automod.
   */
  public get sexuality() {
    return this.data.sexuality_sex_or_gender;
  }

  /**
   * The misogyny level of the automod.
   */
  public get misogyny() {
    return this.data.misogyny;
  }

  /**
   * The bullying level of the automod.
   */
  public get bullying() {
    return this.data.bullying;
  }

  /**
   * The harassment level of the automod.
   */
  public get swearing() {
    return this.data.swearing;
  }

  /**
   * The racism level of the automod.
   */
  public get racism() {
    return this.data.race_ethnicity_or_religion;
  }

  /**
   * The level of sex based terms of the automod.
   */
  public get sexBasedTerms() {
    return this.data.sex_based_terms;
  }

}