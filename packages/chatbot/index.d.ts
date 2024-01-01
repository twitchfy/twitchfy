import { EventEmitter } from 'node:events';
import { client, connection } from 'websocket';
import { ChannelResponse, ChatSettings as ChatSettingsResponse, User as UserResponse, AutoModSettings as AutoModSettingsType, Chatter as ChatterResponse, Ban as BanData, GetFollowers, PostCreateClip, GetStream } from '@twitchapi/api-types';
import { AutoModSettingsOptions, HelixClient } from '@twitchapi/helix';

declare module '@twitchapi/chatbot' {

   

    /* eslint-disable @typescript-eslint/no-explicit-any */
    
   export class ChatBotEventEmitter extends EventEmitter{
      
     override on: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);
     override emit: (<K extends keyof ChatBotEvents>(event: K, ...args: ChatBotEvents[K]) => boolean) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, ...args: any[]) => boolean);

     override off: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);

     override once: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);

     override removeAllListeners: (<K extends keyof ChatBotEvents>(event?: K) => this) &
            (<S extends string | symbol>(event?: Exclude<S, keyof ChatBotEvents>) => this);

   }

   /* eslint-enable @typescript-eslint/no-explicit-any */

    export enum AnnouncementColor {
        'Blue' = 'blue',
        'Green' = 'green',
        'Orange' = 'orange',
        'Purple' = 'purple',
        'Default' = 'primary'
    }

    export enum EventNames {
        'Ready' = 'ready',
        'PrivMsg' = 'PRIVMSG',
        'ClearMsg' = 'CLEARMSG',
        'ClearChat' = 'CLEARCHAT',
        'Join' = 'JOIN',
        'Leave' = 'LEAVE'
    }



    export interface ChatBotOptions {
        clientID: string,
        oauth: string,
        nick: string
        capabilities?: ChatBotCapabilities
        channels?: string[]
        noticeLog?: boolean
    }

    export interface ChatBotCapabilities {
        commands?: boolean
        membership?: boolean
        tags?: boolean
    }



    export interface Badges {
        '1979-revolution_1'?: string
        '60-seconds_1'?: string
        '60-seconds_2'?: string
        '60-seconds_3'?: string
        'H1Z1_1'?: string
        'admin'?: string
        'ambassador'?: string
        'anomaly-2_1'?: string
        'anomaly-warzone-earth_1'?: string
        'anonymous-cheerer'?: string
        'artist-badge'?: string
        'axiom-verge_1'?: string
        'battlechefbrigade_1'?: string
        'battlechefbrigade_2'?: string
        'battlechefbrigade_3'?: string
        'battlerite_1'?: string
        'bits'?: string
        'bits-charity'?: string
        'bits-leader'?: string
        'brawlhalla_1'?: string
        'broadcaster'?: string
        'broken-age_1'?: string
        'bubsy-the-woolies_1'?: string
        'chatter-cs-go-2022'?: string
        'clip-champ'?: string
        'creator-cs-go-2022'?: string
        'cuphead_1'?: string
        'darkest-dungeon_1'?: string
        'deceit_1'?: string
        'devil-may-cry-hd_1'?: string
        'devil-may-cry-hd_2'?: string
        'devil-may-cry-hd_3'?: string
        'devil-may-cry-hd_4'?: string
        'devilian_1'?: string
        'duelyst_1'?: string
        'duelyst_2'?: string
        'duelyst_3'?: string
        'duelyst_4'?: string
        'duelyst_5'?: string
        'duelyst_6'?: string
        'duelyst_7'?: string
        'enter-the-gungeon_1'?: string
        'eso_1'?: string
        'extension'?: string
        'firewatch_1'?: string
        'founder'?: string
        'frozen-cortext_1'?: string
        'frozen-synapse_1'?: string
        'game-developer'?: string
        'getting-over-it_1'?: string
        'getting-over-it_2'?: string
        'glhf-pledge'?: string
        'glitchcon2020'?: string
        'global_mod'?: string
        'heavy-bullets_1'?: string
        'hello_neighbor_1'?: string
        'hype-train'?: string
        'innerspace_1'?: string
        'innerspace_2'?: string
        'jackbox-party-pack_1'?: string
        'kingdom-new-lands_1'?: string
        'moderator'?: string
        'moments'?: string
        'no_audio'?: string
        'no_video'?: string
        'okhlos_1'?: string
        'overwatch-league-insider_1'?: string
        'overwatch-league-insider_2018B'?: string
        'overwatch-league-insider_2019A'?: string
        'overwatch-league-insider_2019B'?: string
        'partner'?: string
        'power-rangers'?: string
        'predictions'?: string
        'premium'?: string
        'psychonauts_1'?: string
        'raiden-v-directors-cut_1'?: string
        'rift_1'?: string
        'rplace-2023'?: string
        'samusoffer_beta'?: string
        'staff'?: string
        'starbound_1'?: string
        'strafe_1'?: string
        'sub-gift-leader'?: string
        'sub-gifter'?: string
        'subscriber'?: string
        'superhot_1'?: string
        'superultracombo-2023'?: string
        'the-surge_1'?: string
        'the-surge_2'?: string
        'the-surge_3'?: string
        'this-war-of-mine_1'?: string
        'titan-souls_1'?: string
        'treasure-adventure-world_1'?: string
        'turbo'?: string
        'twitch-intern-2023'?: string
        'twitchbot'?: string
        'twitchcon2017'?: string
        'twitchcon2018'?: string
        'twitchconAmsterdam2020'?: string
        'twitchconEU2019'?: string
        'twitchconEU2022'?: string
        'twitchconEU2023'?: string
        'twitchconNA2019'?: string
        'twitchconNA2020'?: string
        'twitchconNA2022'?: string
        'twitchconNA2023'?: string
        'tyranny_1'?: string
        'user-anniversary'?: string
        'vga-champ-2017'?: string
        'vip'?: string
        'warcraft'?: string
    
    
    }
    

    export interface ChatBotEvents {
        PRIVMSG: [message: PrivMSG]
        CLEARCHAT: [message: ClearChat]
        CLEARMSG: [message: ClearMessage]
        JOIN: [channel: JoinedChannel]
        LEAVE: [channel: JoinedChannel]
        ready: [client: ChatBot]
    }

    export interface BadgeMetadata {
        subscriber: string
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

    export interface ClearChatTags {
        'room-id': string
        'ban-duration'?: number
        'target-user-id'?: string
        'tmi-sent-ts': string
    }

    export class Ban {

      public chatbot: ChatBot;
      public broadcaster: BanUser;
      public user: BanUser;
      public moderator: BanUser;
      public duration: number | null;
      public createdAt: Date;
      public isBan(): boolean
      public isTimeout(): boolean
      public delete(): Promise<void>


      public constructor(chatbot: ChatBot, data: BanData)
    }

    export class BanUser {

      public chatbot: ChatBot;
      public id: string;
      public sendWhisper(): Promise<void>
      public fetch(): Promise<User>


      public constructor(chatbot: ChatBot, id: string)
    }

    export class ClearChat {
      public chatbot: ChatBot;
      public channel: ClearChatChannel;
      public banDuration: number | null;
      public user: ClearChatUser | null;

      constructor(chatbot: ChatBot, tags: ClearChatTags)
    }

    export class ClearChatChannel {
      public chatbot: ChatBot;
      public name: string;
      public id: string;
      public stream: StreamManager;
      public sendMessage(message: string): void
      public sendAnnouncement(message: string, color: AnnouncementColor): Promise<void>
      public join(): JoinedChannel
      public leave(): JoinedChannel
      public getFollowerCount(): Promise<number>
      public getFollowers(): Promise<Follower[]>
      public getFollower(userID: string): Promise<Follower | null>
      public inStream(): Promise<boolean>
        

      public constructor(chatbot: ChatBot, name: string, id: string)
    }

    export class ClearChatUser {
      public chatbot: ChatBot;
      public id: string;
      public sendWhisper(message: string): Promise<void>
      public fetch(): Promise<User>

      public constructor(chatbot: ChatBot, tags: ClearChatTags)
    }

    export class ClearMessage {
      public chatbot: ChatBot;
      public channel: ClearMessageChannel;
      public user: ClearMessageUser;
      public messageContent: string;
      public constructor(chatbot: ChatBot, data: string, tags: ClearMessageTags)
    }

    export class ClearMessageUser {
      public chatbot: ChatBot;
      public login: string;
      public fetch(): Promise<User>
      public constructor(chatbot: ChatBot, tags: ClearMessageTags)
    }

    export class ClearMessageChannel {
      public chatbot: ChatBot;
      public name: string;
      public sendMessage(message: string): void
      public join(): JoinedChannel
      public leave(): JoinedChannel

      public constructor(chatbot: ChatBot, name: string)
    }

    export interface ClearMessageTags {
        login: string
        'room-id': string
        'target-msg-id': string
        'tmi-sent-ts': string
    }

    export interface PrivMSGTags {
        'badge-info': BadgeMetadata
        badges: Badges
        bits?: string
        color: string
        'display-name': string
        id: string
        mod: string
        'reply-parent-msg-id'?: string
        'reply-parent-user-id'?: string
        'reply-parent-user-login'?: string
        'reply-parent-display-name'?: string
        'reply-parent-msg-body'?: string
        'room-id': string
        subscriber: string
        'tmi-sent-ts': string
        turbo: string
        'user-id': string
        'user-type': string
        vip: string
    }

    export interface BanOptions {
        reason?: string
    }

    export interface TimeoutOptions {
        reason?: string
        duration: number
    }

    export class Chat {
      public chatbot: ChatBot;
      public channel: Channel;
      public settings: ChatSettingsManager;
      public chatters: ChatterManager;
      public setSlowMode(duration: number | null): Promise<ChatSettings>
      public setFollowerMode(duration: number | null): Promise<ChatSettings>
      public setSubscriberMode(query: boolean): Promise<ChatSettings>
      public setUniqueMessagesMode(query: boolean): Promise<ChatSettings>
      public setChatDelay(delay: number | null): Promise<ChatSettings>
      public constructor(chatbot: ChatBot, channel: Channel)
    }

    export class JoinedChannel {
      public chatbot: ChatBot;
      public name: string;
      public sendMessage(message: string): void
      public join(): JoinedChannel
      public leave(): JoinedChannel
      public fetch(): Promise<Channel>

      public constructor(chatbot: ChatBot, name: string)
    }

    export class ChatBotWs extends client {

      public chatbot: ChatBot;
      public nick: string;
      public oauth: string;
      public connection: connection;
      public login(): void
      public sendMessage(message: string): void
      public getPing(): Promise<number>
      private startup(): void


      public constructor(chatbot: ChatBot, nick: string, oauth: string)

    }

    export class ChatBotUser extends User {
      public setNameColor(color: string): Promise<void>
      public constructor(chatbot: ChatBot, user: User)
    }

    export class ChannelManager {
      public chatbot: ChatBot;

      constructor(chatbot: ChatBot);

      public fetch(channelIdentificator: string): Promise<Channel>;

      public join(channelName: string): JoinedChannel;

      public leave(channelName: string): void;
    }


    export class UserManager {
      public chatbot: ChatBot;
      constructor(chatbot: ChatBot)
      public fetch(channelIdentification: string): Promise<User>
    }

    export class ChatSettingsManager {
      public chatbot: ChatBot;
      public chat: Chat;
      public fetch: Promise<ChatSettings>;
      public constructor(chatbot: ChatBot, chat: Chat)
    }

    export class BanManager {
      public chatbot: ChatBot;
      public channel: Channel;
      public createBan(userID: string, options?: BanOptions): Promise<Ban>
      public createTimeout(userID: string, options: TimeoutOptions): Promise<Ban>
      public unBan(userID: string): Promise<void>
      public constructor(chatbot: ChatBot, channel: Channel)
    }

    export class AutoModSettingsManager {
      public chatbot: ChatBot;
      public channel: Channel;
      public fetch(): Promise<AutoModSettings>
      public constructor(chatbot: ChatBot, channel: Channel)
    }

    export class ChatterManager {

      public chatbot: ChatBot;
      public channel: Channel;
      public chat: Chat;
      public fetch(): Promise<UncompleteChatter[]>
      public constructor(chatbot: ChatBot, chat: Chat)
    }

    export class ChatSettings {
      public chatbot: ChatBot;
      public channel: Channel;
      public emotesOnly: boolean;
      public followersOnly: boolean;
      public followersOnlyDuration: number | null;
      public chatDelay: boolean;
      public chatDelayDuration: number | null;
      public slowMode: boolean;
      public slowModeWaitTime: number | null;
      public subsOnly: boolean;
      public uniqueMessagesOnly: boolean;
      public set(options: ChatSettingsOptions): Promise<ChatSettings>
      public constructor(chatbot: ChatBot, data: ChatSettingsResponse, channel: Channel)
    }

    export class AutoModSettings {

      public chatbot: ChatBot;
      public channel: Channel;
      public overallLevel: number | null;
      public disability: number;
      public aggression: number;
      public sexOrGen: number;
      public misogyny: number;
      public bullying: number;
      public swearing: number;
      public ethnicityOrReligion: number;
      public sexBasedTerms: number;
      public set(options: AutoModSettingsOptions): Promise<AutoModSettings>
      public setOverallLevel(value: number): Promise<AutoModSettings>
      public setDisability(value: number): Promise<AutoModSettings>
      public setAggression(value: number): Promise<AutoModSettings>
      public setSexOrGen(value: number): Promise<AutoModSettings>
      public setBullying(value: number): Promise<AutoModSettings>
      public setSwearing(value: number): Promise<AutoModSettings>
      public setEthnicityOrReligion(value: number): Promise<AutoModSettings>
      public setSexBasedTerms(value: number): Promise<AutoModSettings>

      constructor(chatbot: ChatBot, data: AutoModSettingsType, channel: Channel)
    }

    export class AutoMod {

      public chatbot: ChatBot;
      public channel: Channel;
      public settings: AutoModSettingsManager;


      public constructor(chatbot: ChatBot, channel: Channel)
    }



    export class ChatBot extends ChatBotEventEmitter {
      public options: ChatBotOptions;
      public ws: ChatBotWs;
      public readonly oauth: string;
      public capabilities: ChatBotCapabilities;
      public readonly joinedChannels: JoinedChannel[];
      public clientID: string;
      public helixClient: HelixClient;
      public user: ChatBotUser;
      public users: UserManager;
      public channels: ChannelManager;
      public nick: string;
      public noticeLog: boolean;
      public readyAt: Date | null;
      public login(): void
      public destroy(): void
      private setupChannels(): Promise<void>

      public constructor(options: ChatBotOptions)

    }

    export class User {
      public chatbot: ChatBot;
      public id: string;
      public login: string;
      public displayName: string;
      public type: string | null;
      public broadcasterType: string | null;
      public description: string;
      public avatarURL: string;
      public offlineImageURL: string;
      public createdAt: Date;
      public sendWhisper(message: string): Promise<void>
      public fetch(): Promise<User>

      constructor(chatbot: ChatBot, data: UserResponse)

    }


    export class Channel {

      public name: string;
      public broadcaster: User;
      public displayName: string;
      public chatbot: ChatBot;
      public id: string;
      public language: string;
      public gameId: string;
      public gameName: string;
      public title: string;
      public delay: number;
      public tags: string[];
      public bans: BanManager;
      public chat: Chat;
      public automod: AutoMod;
      public stream: StreamManager;
      public sendMessage(message: string): void
      public sendAnnouncement(message: string, color: AnnouncementColor): Promise<void>
      public join(): JoinedChannel
      public leave(): JoinedChannel
      public fetch(): Promise<Channel>
      public getFollowerCount(): Promise<number>
      public getFollowers(): Promise<Follower[]>
      public getFollower(userID: string): Promise<Follower | null>
      public inStream(): Promise<boolean>
        

      constructor(chatbot: ChatBot, data: ChannelResponse, user: User)

    }

    export class UncompleteChatter {
      public chatbot: ChatBot;
      public channel: Channel;
      public chat: Chat;
      public id: string;
      public login: string;
      public displayName: string;
      public user: UncompleteChatterUser;
      public ban(options?: BanOptions): Promise<Ban>
      public timeout(options: TimeoutOptions): Promise<Ban>


      public constructor(chatbot: ChatBot, channel: Channel, data: ChatterResponse)
    }

    export class UncompleteChatterUser {
      public chatbot: ChatBot;
      public login: string;
      public displayName: string;
      public id: string;
      public sendWhisper(message: string): Promise<void>
      public fetch(): Promise<User>
      public constructor(chatbot: ChatBot, data: ChatterResponse)
    }


    export class PrivMSG {
      public chatbot: ChatBot;
      public content: string;
      public id: string;
      public bits: number | null;
      public channel: PrivMSGChannel;
      public user: PrivMSGUser;
      public chatter: PrivMSGChatter;
      public createdTimestamp: number;
      public repliedMessage: PrivMSGRepliedMessage | null;
      public reply(message: string): void
      public delete(): Promise<void>

      public constructor(chatbot: ChatBot, data: string, tags: PrivMSGTags)
    }

    export class PrivMSGChatter {
      public chatbot: ChatBot;
      public channel: PrivMSGChannel;
      private tags: PrivMSGTags;
      public badges: PrivMSGBadges;
      public id: string;
      public login: string;
      public displayName: string;
      public color: string;
      public subscriber: boolean;
      public vip: boolean;
      public mod: boolean;
      public turbo: boolean;
      public user: PrivMSGUser;
      public ban(): Promise<Ban>
      public timeout(): Promise<Ban>
      public fetch(): Promise<Chatter>
      public isBroadcaster(): boolean
      public isVip(): boolean
      public isSub(): boolean
      public isTurboSubscriber(): boolean

      public constructor(chatbot: ChatBot, tags: PrivMSGTags, channel: PrivMSGChannel)
    }

    export class PrivMSGChannel {
      public chatbot: ChatBot;
      public id: string;
      public name: string;
      public stream: StreamManager;
      public sendMessage(message: string): void
      public sendAnnouncement(message: string, color: AnnouncementColor): Promise<void>
      public join(): JoinedChannel
      public leave(): JoinedChannel
      public fetch(): Promise<Channel>
      public getFollowerCount(): Promise<number>
      public getFollowers(): Promise<Follower[]>
      public getFollower(userID: string): Promise<Follower | null>
      public inStream(): Promise<boolean>
        

      public constructor(chatbot: ChatBot, id: string, name: string)
    }

    export class PrivMSGBadges {
      public badges: Badges;
      public has(badge: keyof Badges): boolean
      public constructor(tags: PrivMSGTags)
    }

    export class PrivMSGUser {
      public chatbot: ChatBot;
      public id: string;
      public displayName: string;
      public type: string | null;
      public sendWhisper(message: string): Promise<void>
      public fetch(): Promise<User>
      public constructor(chatbot: ChatBot, tags: PrivMSGTags)
    }

    export class Chatter {
      public chatbot: ChatBot;
      public channel: Channel;
      public chat: Chat;
      public badges: PrivMSGBadges;
      private tags: PrivMSGTags;
      public id: string;
      public login: string;
      public displayName: string;
      public color: string;
      public subscriber: boolean;
      public vip: boolean;
      public mod: boolean;
      public turbo: boolean;
      public user: PrivMSGUser;
      public ban(options?: BanOptions): Promise<Ban>
      public timeout(options: TimeoutOptions): Promise<Ban>
      public fetch(): Promise<Chatter>
      public isBroadcaster(): boolean
      public isVip(): boolean
      public isSub(): boolean
      public isTurboSubscriber(): boolean

      public constructor(chatbot: ChatBot, tags: PrivMSGTags, channel: Channel)
    }

    export class PrivMSGRepliedMessage {
      public chatbot: ChatBot;
      public id: string;
      public content: string;
      public channel: PrivMSGChannel;
      public chatter: PrivMSGRepliedMessageChatter;
      public user: PrivMSGUser;
      public reply(message: string): void
      public delete(): Promise<void>

      public constructor(tags: PrivMSGTags, chatbot: ChatBot, channel: Channel)
    }


    export class PrivMSGRepliedMessageChatter {
      public chatbot: ChatBot;
      public channel: PrivMSGChannel;
      private tags: PrivMSGTags;
      public id: string;
      public login: string;
      public displayName: string;
      public user: PrivMSGUser;
      public ban(options?: BanOptions): Promise<Ban>
      public timeout(options: TimeoutOptions): Promise<Ban>
      public fetch(): Promise<Chatter>
    }

    export class Follower{
   
      public chatbot: ChatBot;
    
      public user: FollowerUser;
    
      public followedAt: Date;
    
      public constructor(chatbot: ChatBot, data: GetFollowers)
    }

    export class FollowerUser{

      public chatbot: ChatBot;

      public login: string;
    
      public displayName: string;
    
      public id: string;
    
      public fetch(): Promise<User>

      public sendWhisper(): Promise<void>

      public constructor(chatbot: ChatBot, id: string, login: string, displayName: string)
    }

    export class CreatedClip{

      public chatbot: ChatBot;
      public id: string;
      public url: string;
      public constructor(chatbot: ChatBot, data: PostCreateClip)
    }

    export class Stream {

      public chatbot: ChatBot;
      public broadcaster: Broadcaster;
      public id: string;
      public gameId: string;
      public gameName: string;
      public type: string;
      public title: string;
      public tags: string[];
      public viewerCount: number;
      public startedAt: Date;
      public language: string;
      public thumbnailURL: string;
      public isMature: boolean;
      public createClip(delay?: boolean): Promise<CreatedClip>
      public constructor(chatbot: ChatBot, data: GetStream)
    }

    export class Broadcaster {
      public chatbot: ChatBot;
      public login: string;
      public displayName: string;
      public id: string;
      public sendWhisper(message: string): Promise<void>
      public fetch(): Promise<User>
      public constructor(chatbot: ChatBot, id: string, login: string, displayName: string)
    }

    export class StreamManager{

      public chatbot: ChatBot;
      public channel: Channel | PrivMSGChannel | ClearChatChannel;
      public fetch(): Promise<Stream | null>
      public constructor(chatbot: ChatBot, channel: Channel | PrivMSGChannel | ClearChatChannel)
    }
}
