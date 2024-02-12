import type { WhisperBody, BanBody, TimeoutBody, AnnouncementBody, SendChatMessageBody, SubscriptionBody } from '../structures';

export type PostBody = WhisperBody | BanBody | TimeoutBody | AnnouncementBody | SubscriptionBody | SendChatMessageBody | null