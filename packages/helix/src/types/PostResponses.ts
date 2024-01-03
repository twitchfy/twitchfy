import { BanUserResponse, PostCreateClipResponse, PostEventSubscriptionsResponse } from '@twitchapi/api-types';

export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse |  PostEventSubscriptionsResponse |void>