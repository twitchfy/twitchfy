import type { ConnectionTypes } from './ConnectionTypes';
import type { WebSocketConnection, WebSocketSubscription } from '../ws';
import type { WebhookConnection, WebhookSubscription } from '../webhook';
import type { SubscriptionTypes } from '../enums';
import type { Conduit, ConduitSubscription } from '../structures';

export type SubscriptionType<U extends SubscriptionTypes = SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> = K extends WebhookConnection ? WebhookSubscription<U> : K extends WebSocketConnection ? WebSocketSubscription<U> : K extends Conduit ? ConduitSubscription<U> : WebSocketSubscription<U> & WebhookSubscription<U>