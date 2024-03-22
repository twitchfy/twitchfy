/* eslint-disable @typescript-eslint/no-explicit-any */

import type { WebSocketConnection } from '../structures';
import type { SubscriptionTypes } from '../../enums';
import type { SubscriptionMessages } from '../../interfaces';


export type WebSocketSubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages<WebSocketConnection>[T]) => any | Promise<any> 