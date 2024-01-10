/* eslint-disable @typescript-eslint/no-explicit-any */

import { HelixClient } from '@twitchapi/helix';
import { PostEventSubscriptions } from '@twitchapi/api-types';
import { client, connection } from 'websocket';
import { EventEmitter } from 'node:events';

declare module '@twitchapi/eventsub' {

    export class Client {
      public createConnection(options: EventSubConnectionOptions): EventSubConnection
      public constructor()
    }

    export interface EventSubConnectionOptions { 
        clientID: string
        auth: string
        proxy?: string
        helix?: HelixOptions
    }

    export interface HelixOptions {
        proxy?: string
    }

    export class EventSubConnection extends EventSubEventEmitter{
      public client: Client;    
      public auth: string;  
      public clientID: string;  
      public proxy?: string; 
      public helixClient: HelixClient;  
      public subscriptions: SubscriptionCollection; 
      public ws: EventSubWebsocket; 
      public sessionID: string | null;
      public setAuth(auth: string): this
      public constructor(client: Client, options: EventSubConnectionOptions)
    }

    export class EventSubEventEmitter extends EventEmitter{

      override on: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
                  (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);
      override emit: (<K extends keyof EventSubEvents>(event: K, ...args: EventSubEvents[K]) => boolean) &
                  (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, ...args: any[]) => boolean);
      
      override off: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
                  (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);
      
      override once: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
                  (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);
      
      override removeAllListeners: (<K extends keyof EventSubEvents>(event?: K) => this) &
                  (<S extends string | symbol>(event?: Exclude<S, keyof EventSubEvents>) => this);
      
      public constructor()
    }

    export interface EventSubEvents {
        connectionReady: [connection: EventSubConnection],
        subscriptionCreate: [subscription: Subscription]
    }

    export class Subscription<T extends SubscriptionTypes = SubscriptionTypes> {
      public connection: EventSubConnection;
      public auth: string; 
      public id: string; 
      public nonce: string | null;
      public type: T;
      public status: string;
      public version: string; 
      public options: SubscriptionOptions[T]; 
      public createdAt: Date; 
      public readonly callbacks: SubscriptionCallbackManager<T>;
      public onMessage(callback: SubscriptionCallback<T>)
      public delete(): Promise<void>
      public constructor(connection: EventSubConnection, auth: string, subscriptionType: T, data: PostEventSubscriptions)
    }

    export enum SubscriptionTypes {
        ChannelUpdate = 'channel.update',
        ChannelFollow = 'channel.follow',
        ChannelChatClear = 'channel.chat.clear',
        StreamOnline = 'stream.online'
    }

    export interface SubscriptionOptions {
        [SubscriptionTypes.ChannelFollow] : ChannelFollowOptions
        [SubscriptionTypes.ChannelUpdate] : ChannelUpdateOptions
        [SubscriptionTypes.ChannelChatClear]: ChannelChatClearOptions
        [SubscriptionTypes.StreamOnline]: StreamOnlineOptions
    }

    export interface ChannelFollowOptions {
        broadcaster_user_id: string
        moderator_user_id: string
    }

    export interface ChannelUpdateOptions {
        broadcaster_user_id: string
    }

    export interface ChannelChatClearOptions {
        broadcaster_user_id: string
        user_id: string
    }

    export interface StreamOnlineOptions {
        broadcaster_user_id: string
    }

    export class SubscriptionCallbackManager<T extends SubscriptionTypes> {
      public connection: EventSubConnection;  
      public subscription: Subscription<T>;
      private callbacks: SubscriptionCallback<T>[]; 
      public add(callback: SubscriptionCallback<T>): this
      public execute(message: SubscriptionMessages[T])
      public constructor(connection: EventSubConnection, subscription: Subscription<T>)
    }

    export type SubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages[T]) => any | Promise<any> 

    export interface SubscriptionMessages {
        [SubscriptionTypes.ChannelFollow]: ChannelFollowMessage
        [SubscriptionTypes.ChannelUpdate]: ChannelUpdateMessage
        [SubscriptionTypes.ChannelChatClear]: ChannelChatClearMessage
        [SubscriptionTypes.StreamOnline]: StreamOnlineMessage
    }

    export class Base<T extends SubscriptionTypes> {
      public connection: EventSubConnection; 
      public subscription: Subscription<T>; 
      public constructor(connection: EventSubConnection, subscription: Subscription<T>)
    }

    export class BaseBroadcaster<T extends SubscriptionTypes> extends Base<T> {
      public id: string;  
      public login: string; 
      public displayName: string; 
      public constructor(connection: EventSubConnection, subscription: Subscription<T>, id: string, login: string, displayName: string)
    }

    export class BaseUser<T extends SubscriptionTypes> extends Base<T> {
      public id: string;  
      public login: string; 
      public displayName: string; 
      public constructor(connection: EventSubConnection, subscription: Subscription<T>, id: string, login: string, displayName: string)
    }

    export class BaseStream<T extends SubscriptionTypes> extends Base<T> {
      public id: string;    
      public type: StreamTypes; 
      public startedAt: Date;  
      public constructor(connection: EventSubConnection, subscription: Subscription<T>, id: string, type: StreamTypes, started_at: string)
    }

    export type StreamTypes = 'live' | 'playlist' | 'watch_party' | 'premiere' | 'rerun'

    export class ChannelFollowMessage extends Base<SubscriptionTypes.ChannelFollow>{
      public broadcaster: ChannelFollowBroadcaster;
      public follower: ChannelFollowUser;
      public followedAt: Date;
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelFollow>, data: ChannelFollowEvent)
    }

    export interface ChannelFollowEvent {
        user_id: string
        user_login: string
        user_name: string
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        followed_at: string
    }

    export class ChannelFollowBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelFollow>{
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelFollow>, id: string, login: string, displayName: string)
    }

    export class ChannelFollowUser extends BaseUser<SubscriptionTypes.ChannelFollow>{
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelFollow>, id: string, login: string, displayName: string)
    }

    export class ChannelUpdateMessage extends Base<SubscriptionTypes.ChannelUpdate>{
      public broadcaster: ChannelUpdateBroadcaster;
      public title: string;
      public language: string;
      public category: ChannelUpdateCategory;
      public labels: string;
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelUpdate>, data: ChannelUpdateEvent)
    }

    export interface ChannelUpdateEvent {
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        title: string
        language: string
        category_id: string
        category_name: string
        content_classification_labels: string
    }

    export class ChannelUpdateBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelUpdate>{
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelUpdate>, id: string, login: string, displayName: string)
    }

    export class ChannelUpdateCategory extends Base<SubscriptionTypes.ChannelUpdate> { 
      public id: string;   
      public name: string;  
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelUpdate>, id: string, name: string)
    }

    export class ChannelChatClearMessage extends Base<SubscriptionTypes.ChannelChatClear>{
      public broadcaster: ChannelChatClearBroadcaster;
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClear>, data: ChannelChatClearEvent)
    }

    export interface ChannelChatClearEvent {
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
    }

    export class ChannelChatClearBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelChatClear> {
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelChatClear>, id: string, login: string, displayName: string)
    }

    export class StreamOnlineMessage extends Base<SubscriptionTypes.StreamOnline>{
      public broadcaster: StreamOnlineBroadcaster;
      public stream: StreamOnlineStream; 
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, data: StreamOnlineEvent)
    }

    export interface StreamOnlineEvent {
        id: string
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        type: StreamTypes
        started_at: string
    }

    export class StreamOnlineBroadcaster extends BaseBroadcaster<SubscriptionTypes.StreamOnline>{
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, id: string, login: string, displayName: string)
    }

    export class StreamOnlineStream extends BaseStream<SubscriptionTypes.StreamOnline>{
      public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, id: string, type: StreamTypes, started_at: string)
    }

    export class SubscriptionCollection<T extends SubscriptionTypes = SubscriptionTypes> extends Map<string, Subscription<T>> {
      override get<K extends T>(key: string): Subscription<K> | undefined
      override set<K extends T>(key: string, value: Subscription<K>): this
    }

    export class EventSubWebsocket extends client {
      public connection: EventSubConnection;   
      public wsConnection: connection | null;
      public connect()   
      public constructor(connection: EventSubConnection)
    }

}