/* eslint-disable @typescript-eslint/ban-types*/

import type { ConnectionTypes } from './ConnectionTypes';
import type { SubscriptionTypes } from '../enums';
import type { WebhookConnection, WebhookSubscription } from '../webhook';
import type { WebSocketSubscription } from '../ws';

export type StorageAdapterGet<K extends ConnectionTypes, T extends SubscriptionTypes = SubscriptionTypes> = K extends WebhookConnection ? Pick<WebhookSubscription<T>, 'id' | 'secret' | 'type' | 'options'> & { [key: string] : unknown, nonce?: string } : Pick<WebSocketSubscription<T>, 'id' | 'type' | 'options'> & { [key: string] : unknown, nonce?: string } 
