import type { ChannelEmote as ChannelEmoteData, EmoteType } from '@twitchapi/api-types';
import type { ChatBot } from './ChatBot';
import { Emote } from './Emote';
import type { EventSubConnection } from '../enums';

/**
 * Represents a Twitch channel emote.
 */
export class ChannelEmote<T extends EventSubConnection> extends Emote<T, 'channel'> {

  /**
   * The type of the emote.
   */
  public readonly type: EmoteType;

  /**
   * The ID of the emote set.
   */
  public readonly emoteSetID: string;

  public constructor(chatbot: ChatBot<T>, data: ChannelEmoteData & { template: string, owner_id: string }){
    super(chatbot, data);
    this.type = data.emote_type;
    this.emoteSetID = data.emote_set_id;
  }

  /**
   * Overrides isChannel method from BaseEmote to assert this as ChannelEmote and not BaseEmote.
   * @returns Whether the emote is a channel emote.
   */
  public override isChannel(): this is ChannelEmote<T> {
    return true;
  }

  /**
   * Returns the subscription tier necessary to use the emote. If the emote is not a subscription emote, it will return null.
   */
  public get tier() {
    if(this.type !== 'subscriptions') return null;
    return Number((this.emoteData as ChannelEmoteData & { template: string, owner_id: string }).tier[0]);
  }
}