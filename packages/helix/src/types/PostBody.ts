import type { WhisperBody, BanBody, TimeoutBody, AnnouncementBody, SendChatMessageBody } from '../structures';
import type { SubscriptionOptions } from '../interfaces';

export type PostBody = WhisperBody | BanBody | TimeoutBody | AnnouncementBody | SubscriptionOptions | SendChatMessageBody | null