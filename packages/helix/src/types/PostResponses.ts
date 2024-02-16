import type { BanUserResponse, PostCreateClipResponse, PostEventSubSubscriptionsResponse, PostSendChatMessageResponse } from '@twitchapi/api-types';

export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse |  PostEventSubSubscriptionsResponse | PostSendChatMessageResponse | void>