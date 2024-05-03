/* eslint-disable @typescript-eslint/no-explicit-any */

import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { HelixClient } from '@twitchfy/helix';
import { SubscriptionCollection } from './SubscriptionCollection';
import type { ConnectionTypes, SubscriptionOptions, SubscriptionType, BaseConnectionOptions } from '../types';
import type { ConduitEvents, WebhookEvents, WebSocketEvents } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import { Logger } from '../logger';
import type { StorageAdapter } from '../storage';


/**
 * The EventSub Event Emitter of any type of connection.
 */
export class EventSubEventEmitter<U extends WebhookEvents | WebSocketEvents | ConduitEvents> extends AsyncEventEmitter<U> {
  /**
   * Builds up a EventSub Event Emitter.
   */
  public constructor() {
    super();
  }
}

/**
 * The base class for all the connections.
 */
export abstract class BaseConnection<K extends ConnectionTypes, U extends WebhookEvents | WebSocketEvents | ConduitEvents> extends EventSubEventEmitter<U>{

  /**
   * The client ID of the connection.
   */
  public readonly clientId: string;

  /**
   * The client secret of the connection.
   */
  public readonly clientSecret: string;

  /**
   * The Helix client used by the connection for making API Requests.
   */
  public readonly helixClient: HelixClient;

  /**
   * The subscriptions of the connection. You will only receive events for this subscriptions.
   */
  public readonly subscriptions: SubscriptionCollection<K>;

  /**
   * The storage adapter used by the connection for storing subscriptions.
   */
  public readonly storage: StorageAdapter<K>;

  /**
   * Whether the connection should maintain the subscriptions or not between each start.
   */
  public readonly maintainSubscriptions: boolean;

  /**
   * The logger of the connection.
   */
  public readonly logger: Logger;

  /**
   * Whether the connection is in debug mode or not.
   */
  public debug: boolean;

  /**
   * Builds up a BaseConnection.
   * @param options The options of the connection.
   */
  public constructor(options: BaseConnectionOptions<K>){

    super();

    this.clientId = options.clientId;

    this.clientSecret = options.clientSecret;

    this.helixClient = new HelixClient({ clientId: options.clientId, clientSecret: options.clientSecret, ...options.helix });

    this.subscriptions = new SubscriptionCollection<K>();

    this.storage = 'storage' in options ? options.storage.adapter : null;

    this.maintainSubscriptions = options.maintainSubscriptions ?? true;

    this.debug = typeof options.debug !== 'boolean'? false : options.debug;

    this.logger = new Logger(options.logger ?? { active: this.debug });

  }

  /**
   * Subscribe to an EventSub event.
   * @param options The options of the subscription.
   */
  abstract subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<SubscriptionType<T, K>>

  /**
   * Subscribe to multiple EventSub events.
   * @param options The options of the subscriptions.
   */
  abstract subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptions<T>[]): Promise<SubscriptionType<T, K>[]>

  /**
   * Makes a debug log
   * @param args The arguments to log.
   * @returns 
   */
  public makeDebug(...args: any[]){

    return this.logger.info(...args);

  }

  /**
   * Makes a warn log
   * @param args The arguments to log.
   * @returns 
   */
  public makeWarn(...args: any[]){

    return this.logger.warn(...args);

  }
}