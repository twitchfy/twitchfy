import type { ChatSettingsOptions } from '../interfaces/ChatSettingsOptions';
import type { PatchChatSettings } from '@twitchapi/api-types';

export class ChatSettingsBody implements PatchChatSettings{
  public emote_mode?: boolean;
  public follower_mode? : boolean;
  public follower_mode_duration?: number | null;
  public non_moderator_chat_delay?: boolean;
  public non_moderator_chat_delay_duration?: number;
  public slow_mode? : boolean;
  public slow_mode_wait_time?: number | null;
  public subscriber_mode?: boolean;
  public unique_chat_mode?: boolean;
  public constructor(data?: ChatSettingsOptions){
    this.emote_mode = data.emoteMode;
    this.follower_mode = data.followerMode;
    this.follower_mode_duration = data.followerModeDuration;
    this.non_moderator_chat_delay = data.chatDelay;
    this.non_moderator_chat_delay_duration = data.chatDelayDuration;
    this.slow_mode = data.slowMode;
    this.slow_mode_wait_time = data.slowModeWaitTime;
    this.subscriber_mode = data.subscriberMode;
    this.unique_chat_mode = data.uniqueMessagesMode;

  }
}
