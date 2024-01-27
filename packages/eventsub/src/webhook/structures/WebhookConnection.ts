import { Express } from 'express';
import { HelixClient } from '@twitchapi/helix';
import { WebhookConnectionOptions } from '../interfaces/WebhookConnectionOptions';
import { makeMiddlewares } from '../util/makeMiddlewares';
import { generateSecret } from '../util/generateSecret';
import { parseRoute } from '../util/parseRoute';
import SubscriptionRouter from '../routes/SubscriptionRoute';
import { Client } from '../../structures/Client';
import { SubscriptionCollection } from '../../structures/SubscriptionCollection';
import { EventSubEventEmitter } from '../../structures/EventSubEventEmitter';
import { Subscription } from '../../structures/Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { Events } from '../../enums/Events';
import { SubscriptionOptions } from '../../interfaces/SubscriptionOptions';
import { SubscriptionOptionsIndex } from '../../interfaces/SubscriptionOptionsIndex';
import { SubscriptionVersions } from '../../util/SubscriptionVersions';


export class WebhookConnection extends EventSubEventEmitter<WebhookConnection>{

  public client: Client;

  public server: Express;

  public baseURL: string;

  public auth: string;

  public clientID: string;

  public helixClient: HelixClient;

  public subscriptions: SubscriptionCollection<WebhookConnection>;

  public startServer: boolean;

  public readonly subscriptionRoute: string;
  

  public constructor(client: Client, options: WebhookConnectionOptions, server: Express){

    super();

    this.client = client;

    this.baseURL = options.baseURL;

    this.auth = options.auth;

    this.clientID = options.clientID;

    this.helixClient = new HelixClient({ clientId: options.clientID, appToken: options.auth, ...options.helix });

    this.subscriptions = new SubscriptionCollection<WebhookConnection>();

    this.subscriptionRoute = options.subscriptionRoute ? parseRoute(options.subscriptionRoute) : '/subscriptions';

    this.startServer = options.startServer || true;

    this.server = server;

    this.startup();
  }

  public async subscribe<T extends SubscriptionTypes>(options: SubscriptionOptions<T>): Promise<Subscription<T, WebhookConnection>>{

    const { type, options: subscriptionOptions, auth } = options;

    const secret = generateSecret();
 
    const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersions[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret }, condition: subscriptionOptions }, auth, { useTokenType: 'app' });

    const subscription = new Subscription<T, WebhookConnection>(this, options, data, secret);

    this.subscriptions.set(subscription.id, subscription);

    this.emit(Events.SubscriptionCreate, subscription);

    return subscription;


  }

  public async subscribeAll<T extends SubscriptionTypes>(...options: SubscriptionOptionsIndex[T][]): Promise<Subscription<T, WebhookConnection>[]>{

    const subscriptions: Subscription<SubscriptionTypes, WebhookConnection>[] = [];

    for(const sub of options){
      
      const { type, options: subscriptionOptions, auth } = sub;

      const secret = generateSecret();
 
      const data = await this.helixClient.subscribeToEventSub({ type , version: SubscriptionVersions[type], transport: { method: 'webhook', callback: `${this.baseURL}${this.subscriptionRoute}`, secret }, condition: subscriptionOptions }, auth , { useTokenType: 'app' });

      const subscription = new Subscription<SubscriptionTypes, WebhookConnection>(this, sub, data, secret);

      this.subscriptions.set(subscription.id, subscription);

      this.emit(Events.SubscriptionCreate, subscription);

      subscriptions.push(subscription);
    }

    return subscriptions as Subscription<T, WebhookConnection>[];

  }

  public start(port?: number, callback?: () => void){

    if(this.startServer) this.server.listen(port, callback);

    this.startup();

  }

  private startup() {

    makeMiddlewares(this, this.server);

    this.server.use(this.subscriptionRoute, SubscriptionRouter);

    this.emit(Events.ConnectionReady, this);

  }
}