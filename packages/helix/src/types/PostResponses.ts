import { BanUserResponse, PostCreateClipResponse } from '@twitchapi/api-types';

export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse>