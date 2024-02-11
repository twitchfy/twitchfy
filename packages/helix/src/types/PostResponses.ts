import type { BanUserResponse, PostCreateClipResponse, PostEventSubscriptionsResponse, SendChatMessageResponse } from '@twitchapi/api-types';

export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse |  PostEventSubscriptionsResponse | SendChatMessageResponse | void>