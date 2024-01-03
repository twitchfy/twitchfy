import { User, Channel, Ban, ChatSettings, GetBan, PostBanBody, PostBanData, PatchChatSettings, PostWhisperBody, AutoModSettings, PutAutoModSettings, Chatter, GetFollowers, PostCreateClip, GetStream, GetChatSettingsResponse, UserResponse, GetBansResponse, ChannelResponse, GetAutoModSettingsResponse, GetFollowersResponse, GetStreamResponse, BanUserResponse, PostCreateClipResponse, PostEventSubscriptionsResponse, PostEventSubscriptions } from '@twitchapi/api-types';
import type { Response } from 'node-fetch';

declare module '@twitchapi/helix' {

    export enum AnnouncementColor {
        'Blue' = 'blue',
        'Green' = 'green',
        'Orange' = 'orange',
        'Purple' = 'purple',
        'Default' = 'primary'
    }

    export type GetResponses = Promise<GetChatSettingsResponse | UserResponse | ChannelResponse | GetBansResponse | GetAutoModSettingsResponse | GetFollowersResponse | GetStreamResponse>

    export type PostResponses = Promise<BanUserResponse | PostCreateClipResponse | PostEventSubscriptionsResponse>

    export type PatchResponses = Promise<GetChatSettingsResponse>

    export type PutResponses = Promise<GetAutoModSettingsResponse>

    export class BanBody implements PostBanBody {
      public data: PostBanData;
      public constructor(user_id: string, reason?: string)
    }


    export class TimeoutBody implements PostBanBody {
      public data: PostBanData;
      public constructor(user_id: string, duration: number, reason?: string)
    }

    export class AnnouncementBody {
      public message: string;
      public color: AnnouncementColor;
      public constructor(message: string, color: AnnouncementColor)
    }

    export class WhisperBody implements PostWhisperBody {
      public message: string;
      public constructor(message: string)
    }


    export interface HelixClientOptions {
        clientId: string
        appToken?: string
        userToken?: string

    }

    export interface ChatSettingsOptions{
        emoteMode?: boolean
        followerMode?: boolean
        followerModeDuration?: number
        chatDelay?: boolean
        chatDelayDuration?: number
        slowMode?: boolean
        slowModeWaitTime?: number
        subscriberMode?: boolean,
        uniqueMessagesMode?: boolean
    
    }


    export interface AutoModSettingsOptions{
        overallLevel?: number | null
        disability?: number
        aggression?: number
        sexOrGen?: number
        misogyny?: number
        bullying?: number
        swearing?: number
        ethnicityOrReligion?: number
        sexBasedTerms?: number
    }

    export interface SubscriptionTransport {
      method: 'webhooks' | 'websocket'
      callback?: string
      secret?: string
      session_id?: string
  }


  
export interface SubscriptionOptions {
  type: string
  version: number
  condition: object
  transport: SubscriptionTransport
  
}
    

    export class ChatSettingsBody implements PatchChatSettings {
      public emote_mode?: boolean;
      public follower_mode?: boolean;
      public follower_mode_duration?: number | null;
      public non_moderator_chat_delay?: boolean;
      public non_moderator_chat_delay_duration?: number;
      public slow_mode?: boolean;
      public slow_mode_wait_time?: number | null;
      public subscriber_mode?: boolean;
      public unique_chat_mode?: boolean;
      public constructor(data?: ChatSettingsOptions)
    }


    export class AutoModSettingsBody implements PutAutoModSettings{
      public overall_level: number | null;
      public disability: number;
      public aggression: number;
      public sexuality_sex_or_gender: number;
      public misogyny: number;
      public bullying: number;
      public swearing: number;
      public race_ethnicity_or_religion: number;
      public sex_based_terms: number;
      public constructor(data: AutoModSettingsOptions)
    }

    export class RequestManager {

      public client: BaseClient;
      public get(endpoint: string, params: string, userToken?: string): GetResponses
      public deleteWithUserToken(endpoint: string, params: string, userToken?: string): void
      public postWithUserToken(endpoint: string, params: string, body: WhisperBody | BanBody | TimeoutBody | AnnouncementBody | null, userToken?: string): Promise<PostResponses>
      public patchWithUserToken(endpoint: string, params: string, body: ChatSettingsBody | null, userToken?: string): PatchResponses
      public putWithUserToken(endpoint: string, params: string, body?: AutoModSettingsBody, userToken?: string): PutResponses
      public validateUserToken() : Promise<void>
      private makeHeaders(token: 'app' | 'user', userToken?: string): { Authorization: string, 'Client-Id': string, 'Content-Type': string }

      public constructor(client: BaseClient)
    }
    export class BaseClient {

      public appToken: string;
      public userToken?: string;
      public clientId: string;
      public requestManager: RequestManager;
      public getUser(userIdentificator: string, userToken?: string): Promise<User>
      public getUsers(usersIdentifications: string[], userToken?: string): Promise<User[]>
      public getChannel(channelIdentification: string, userToken?: string): Promise<Channel>
      public getChannels(channelsIdentification: string[], userToken?: string): Promise<Channel[]>
      public deleteMessage(id: string, moderator_id: string, broadcaster_id: string): Promise<void>
      public sendWhisper(senderUserID: string, receiverUserID: string, body: WhisperBody, userToken?: string): Promise<void>
      public banUser(broadcaster_id: string, moderator_id: string, body: BanBody, userToken?: string): Promise<Ban>
      public timeoutUser(broadcaster_id: string, moderator_id: string, body: TimeoutBody, userToken?: string): Promise<Ban>
      public getBans(broadcaster_id: string, user_id?: string[], userToken?: string): Promise<GetBan[] | GetBan>
      public unBanUser(broadcaster_id: string, moderator_id: string, user_id: string, userToken?: string): Promise<void>
      public sendAnnouncement(broadcaster_id: string, moderator_id: string, body: AnnouncementBody, userToken?: string): Promise<void>
      public sendShoutout(from_broadcaster_id: string, to_broadcaster_id: string, moderator_id: string, userToken?: string): Promise<void>
      public getChatSettings(broadcaster_id: string, moderator_id: string, userToken?: string): Promise<ChatSettings>
      public updateChatSettings(broadcaster_id: string, moderator_id: string, body: ChatSettingsBody, userToken?: string): Promise<ChatSettings>
      public updateUserColor(user_id: string, color: string, userToken?: string): Promise<void>
      public getAutoModSettings(broadcaster_id: string, moderator_id: string, userToken?: string): Promise<AutoModSettings>
      public updateAutoModSettings(broadcaster_id: string, moderator_id: string, body: AutoModSettingsBody, userToken?: string) : Promise<AutoModSettings>
      public getChatters(broadcaster_id: string, moderator_id: string, userToken?: string) : Promise<Chatter[]>
      public getChannelFollowerCount(broadcaster_id: string, userToken?: string): Promise<number>
      public getChannelFollowers(broadcaster_id: string, userToken?: string): Promise<GetFollowers[]>
      public getChannelFollower(broadcaster_id: string, user_id: string, userToken?: string): Promise<GetFollowers>
      public createClip(broadcaster_id: string, delay: boolean, userToken?: string) : Promise<PostCreateClip>
      public getStream(userIdentificator: string): Promise<GetStream | null>
      public subscribeToEventSub(options: SubscriptionOptions, userToken?: string): Promise<PostEventSubscriptions>


      public constructor(clientId: string, appToken?: string, userToken?: string)
    }

    export class HelixClient extends BaseClient implements HelixClientOptions {

      public constructor(options: HelixClientOptions)

    }

    export function handlePagination(client: HelixClient, endpoint: string, params: string, method: 'GET', userToken?: string)

    export interface Error{
        error: string
        status: number
        message: string
    }

    export class TwitchHelixError extends Error {
      public override name: string;
      public override message: string;
      public readonly status: number;
      public readonly error: string;
      public readonly url: string;
    
      public constructor(response: Response, error: Error)
    }


}