/* eslint-disable @typescript-eslint/no-explicit-any */

import type { WebhookConnection } from '../structures';
import type { SubscriptionTypes } from '../../enums';
import type { SubscriptionMessages } from '../../interfaces';


export type WebhookSubscriptionCallback<T extends SubscriptionTypes> = (message: SubscriptionMessages<WebhookConnection>[T]) => any | Promise<any> 