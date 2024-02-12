import type { BanUserResponse, PostCreateClipResponse, PostEventSubscriptionsResponse, PostSendChatMessageResponse } from '@twitchapi/api-types';

export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse |  PostEventSubscriptionsResponse | PostSendChatMessageResponse | void>