import { GetChatSettingsResponse, UserResponse, ChannelResponse, GetBansResponse, GetAutoModSettingsResponse, GetFollowersResponse, GetStreamResponse } from '@twitchapi/api-types';

export type GetResponses = Promise<GetChatSettingsResponse | UserResponse | ChannelResponse | GetBansResponse | GetAutoModSettingsResponse | GetFollowersResponse | GetStreamResponse>