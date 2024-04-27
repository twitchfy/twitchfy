/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { Events, WebhookConnection, WebSocketConnection } from '@twitchfy/eventsub';
import type { GetClipsOptions, GetStreamsOptions } from '@twitchfy/helix';
import { HelixClient } from '@twitchfy/helix';
import { join } from 'path';
import { BaseChannel } from './BaseChannel';
import { Collection } from './Collection';
import { ChatBotUser } from './ChatBotUser';
import { EventHandler } from './EventHandler';
import { CommandHandler } from './CommandHandler';
import type { ChatCommand } from './ChatCommand';
import type { TwitchContext } from './TwitchContext';
import type { ChannelProfile } from './ChannelProfile';
import { Stream } from './Stream';
import { Clip } from './Clip';
import { ChatRoom } from './ChatRoom';
import { ChannelManager, ChatBotBanManager, ChatBotMessageManager, ChatBotTimeoutManager, ChatBotUserManager } from './managers';
import { EventSubConnection } from '../enums';
import type { Events as ChatBotEvents } from '../types';
import type { ChatBotOptions, EventSubConnectionMap, Handlers } from '../interfaces';
import { handleEvent, handleSubscriptionReload } from '../util';
import type { EventDataForConnection } from '../functions';


/**
 * Represents a chatbot.
 */
export class ChatBot<T extends EventSubConnection = EventSubConnection> {

  /**
   * The client Id of the Twitch's application.
   */
  public readonly clientId: string;

  /**
   * The client secret of the Twitch's application.
   */
  public readonly clientSecret: string;

  /**
   * A Collection of the profiles of the joined channels.
   */
  public readonly profiles: Collection<string, ChannelProfile<T>>;

  /**
   * The manager of the chatbot channels.
   */
  public readonly channels: ChannelManager<T>;

  /**
   * The handlers of resources of the chatbot.
   * @private
   */
  private readonly handlers: Handlers;

  /**
   * A Collection of the chatbot commands.
   */
  public readonly commands: Collection<string, ChatCommand<T>>;

  /**
   * A Collection of the chatbot events.
   */
  public readonly events: Collection<ChatBotEvents, EventDataForConnection<T>[keyof EventDataForConnection<T>]>;

  /**
   * The message manager of the chatbot.
   */
  public readonly messages: ChatBotMessageManager<T>;

  /**
   * The ban manager of the chatbot.
   */
  public readonly bans: ChatBotBanManager<T>;

  /**
   * The user manager of the chatbot.
   */
  public readonly users: ChatBotUserManager<T>;

  /**
   * The timeout manager of the chatbot.
   */
  public readonly timeouts: ChatBotTimeoutManager<T>;

  /**
   * The Twitch user of the chatbot.
   */
  public user: ChatBotUser<T>;

  /**
   * The user Id of the chatbot.
   */
  public userId: string;

  /**
   * The operator to separate the options in the command.
   */
  public readonly optionOperator: string;

  /**
   * The EventSub connection type used by the chatbot.
   */
  public readonly connectionType: T;

  /**
   * The EventSub connection of the chatbot.
   */
  public readonly eventsub: EventSubConnectionMap[T];

  /**
   * The Helix client of the chatbot.
   */
  public readonly helixClient: HelixClient;

  /**
   * The options of the chatbot.
   */
  public readonly options: ChatBotOptions<T>;

  /**
   * The prefix callback used to handle command prefixes.
   * @protected
   */
  protected __prefix: (message: TwitchContext<{}, T>) => string[];

  /**
   * Creates a new instance of the chatbot.
   * @param options The options to build up the chatbot.
   */
  public constructor(options: ChatBotOptions<T>) {
    this.options = options;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.profiles = new Collection<string, ChannelProfile<T>>();
    this.channels = new ChannelManager<T>(this);
    this.messages = new ChatBotMessageManager<T>(this);
    this.bans = new ChatBotBanManager<T>(this);
    this.timeouts = new ChatBotTimeoutManager<T>(this);
    this.users = new ChatBotUserManager<T>(this);
    this.handlers = {
      commands: new CommandHandler(join(process.cwd(), options.paths.output, options.paths.commands || '.')),
      events: new EventHandler(join(process.cwd(), options.paths.output, options.paths.events || '.'))
    };
    this.commands = new Collection<string, ChatCommand<T>>();
    this.events = new Collection<ChatBotEvents, EventDataForConnection<T>[keyof EventDataForConnection<T>]>();
    this.connectionType = options.connectionType;
    this.optionOperator = options.optionOperator ?? '-';
    this.helixClient = new HelixClient({ ...options, ...options.helix });
    this.__prefix = options.prefix ?? (() => ['!']);
    this.eventsub = this.createEventSubConnection(options.connectionType, options);

    const fn = handleSubscriptionReload.bind(this);
    // @ts-expect-error
    this.eventsub.on(Events.SubscriptionReload, fn);
  }

  /**
   * Creates the EventSub connection of the chatbot.
   * @param type The type of the EventSub connection.
   * @param options The options to build up the EventSub connection.
   * @returns The EventSub connection of the chatbot.
   * @private
   */
  private createEventSubConnection<T extends EventSubConnection>(type: T, options: ChatBotOptions<T>): EventSubConnectionMap[T] {

    switch (type) {

    case EventSubConnection.WebSocket: {

      const { clientId, clientSecret, userToken, eventsub } = options as ChatBotOptions<EventSubConnection.WebSocket>;

      this.helixClient.preferedToken = 'user';

      // @ts-expect-error

      return new WebSocketConnection({ clientId, clientSecret, userToken, ...eventsub });
    }

      break;

    case EventSubConnection.Webhook: {

      const { clientId, clientSecret, eventsub } = options as ChatBotOptions<EventSubConnection.Webhook>;

      this.helixClient.setAppToken(eventsub.appToken);
      // @ts-expect-error

      return new WebhookConnection({ clientId, clientSecret, ...eventsub }, eventsub.server);
    }

      break;

    }


    // @ts-expect-error
    return;
  }

  /**
   * Start the chatbot.
   * @param options The start options to start the chatbot.
   * @returns The current instance of the chatbot. When the promise is resolved the chatbot has been completly started.
   */
  public async start(options?: StartOptions<T>) {

    if(this.options.paths.commands){
      
      const commands = await this.handlers.commands.load();

      for(const commandClass of commands){

        const command = new commandClass<T>();

        if(!command.name || !command.run) continue;

        this.commands.set(command.name, command);
      }
    }

    if(this.options.paths.events){
        
      const events = await this.handlers.events.load();
  
      for(const data of events){

        if(!data.event || !data.run) continue;

        this.events.set(data.event, data);
      }
    }

    const listener = handleEvent.bind(this);

    // @ts-expect-error
    this.eventsub.on(Events.SubscriptionMessage, listener);

    const tokenInfo = await this.helixClient.getUserToken(false);

    this.userId = tokenInfo.user_id;

    this.user = new ChatBotUser(this, await this.helixClient.getUser(this.userId));

    // @ts-expect-error
    await (this.eventsub instanceof WebhookConnection ? this.eventsub.start(options.port, options.callback) : this.eventsub.connect());
  
    const readyEvent = this.events.get('ChatBotReady');

    if(readyEvent) readyEvent.run(this, undefined as never);

    return this;
  }

  public streams(): Promise<Stream<T>[] | null>
  public streams(number?: number): Promise<Stream<T>[] | null>
  public streams(options: GetStreamsOptions<true>, number?: number): Promise<Stream<T>[] | null>

  /**
   * Get Twitch streams from the API. 
   * @param options The options to filter the streams.
   * @param number The number of streams to fetch. This number could vary from the result due to API reasons.
   * @returns An array containing the streams fetched from the API. If there isn't any stream founded, it will return a nullish value.
   */
  public async streams(options?: GetStreamsOptions<boolean> | number, number?: number) {

    if(typeof options === 'number'){

      number = options;
      options = {};

    }

    const streams = await this.helixClient.getStreams(options, { pages: number? number / 100 : Infinity });

    if(!streams.length) return null;

    return streams.map(stream => new Stream<T>(this, stream));
  }

  /**
   * Fetches a Twitch stream from the API.
   * @param options The options for filter the stream.
   * @returns A stream fetched from the API or null if the stream wasn't founded.
   */
  public async stream(options: GetStreamsOptions<false>): Promise<Stream<T> | null> {
    const stream = await this.helixClient.getStream(options);
    return stream ? new Stream<T>(this, stream) : null;
  }

  /**
   * Get Twitch clips from the API.
   * @param options The options to filter the clips.
   * @returns An array containing the clips fetched from the API. If there isn't any clip founded, it will return a nullish value.
   */
  public async clips(options: GetClipsOptions<true>){
    const data = await this.helixClient.getClips(options);
    if(!data.length) return null;
    return data.map(clip => new Clip<T>(this, clip));
  }
  
  /**
   * Get a specific Twitch clip from the API.
   * @param options The options to filter the clip.
   * @returns The clip fetched from the API or null if the clip wasn't founded.
   */
  public async clip(options: GetClipsOptions<false>){
    const data = await this.helixClient.getClip(options);
    if(!data) return null;
    return new Clip<T>(this, data);
  }

  /**
   * Checks whether the chatbot is moderator in a specific channel.
   * @param channelId The Id of the channel to check.
   * @returns A boolean indicating whether the chatbot is moderator in the channel.
   */
  public async isModerator(channelId: string){
    const data = await this.moderatedChannels();

    return data.some((x) => x.id === channelId);
  }

  /**
   * Get the moderated channels of the chatbot.
   * @returns An array containing the moderated channels of the chatbot.
   */
  public async moderatedChannels(){

    const data = await this.helixClient.getModeratedChannels(this.userId);

    return data.map((x) => new BaseChannel<T>(this, x, new ChatRoom<T>(this, x)));
  }
  
  /**
   * The user token of the chatbot Twitch account to make requests.
   */
  public get userToken(){
    return this.helixClient.userToken;
  }

  /**
   * The app token of the Twitch application. The value is null if the chatbot is using a WebSocket EventSub connection.
   */
  public get appToken(){     
    return this.helixClient.appToken ?? null;  
  }

}

/**
 * The options to start the chatbot.
 * @param port The port to start the express server if the startServer option is set into true. Only required if the chatbot is using a Webhook EventSub connection.
 * @param callback A callback to execute when the chatbot is started. Only required if the chatbot is using a Webhook EventSub connection.
 */
export type StartOptions<T extends EventSubConnection> = T extends EventSubConnection.Webhook ? {
    port?: number
    callback?: () => void
} : {}

