/* eslint-disable @typescript-eslint/no-explicit-any */

import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { HelixClient } from '@twitchapi/helix';
import { SubscriptionCollection } from './SubscriptionCollection';
import type { ConnectionTypes, SubscriptionOptions, SubscriptionType, BaseConnectionOptions } from '../types';
import type { WebhookEvents, WebSocketEvents } from '../interfaces';
import type { SubscriptionTypes } from '../enums';
import { Logger } from '../logger';
import type { StorageAdapter } from '../storage';


export class EventSubEventEmitter<U extends WebhookEvents | WebSocketEvents> extends AsyncEventEmitter<U> {
  public constructor() {
    super();
  }
}



export abstract class BaseConnection<K extends ConnectionTypes, U extends WebhookEvents | WebSocketEvents> extends EventSubEventEmitter<U>{

  public readonly clientID: string;

  public readonly clientSecret: string;

  public readonly helixClient: HelixClient;

  public readonly subscriptions: SubscriptionCollection<K>;

  public readonly storage: StorageAdapter<K>;

  public readonly maintainSubscriptions: boolean;

  public readonly logger: Logger;

  public debug: boolean;

  public constructor(options: BaseConnectionOptions<K>){

    super();

    this.clientID = options.clientID;

    this.clientSecret = options.clientSecret;

    this.helixClient = new HelixClient({ clientID: options.clientID, clientSecret: options.clientSecret, ...options.helix });

    this.subscriptions = new SubscriptionCollection<K>();

    this.storage = 'storage' in options ? options.storage.adapter : null;

    this.maintainSubscriptions = options.maintainSubscriptions ?? true;

    this.debug = typeof options.debug !== 'boolean'? false : options.debug;

    this.logger = new Logger(options.logger ?? { active: this.debug });

  }

  abstract subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<SubscriptionType<T, K>>

  abstract subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptions<T>[]): Promise<SubscriptionType<T, K>[]>

  public makeDebug(...args: any[]){

    return this.logger.debug(...args);

  }

  public makeWarn(...args: any[]){

    return this.logger.warn(...args);

  }
}