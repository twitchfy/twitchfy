/* eslint-disable @typescript-eslint/ban-types */

import type { TokenAdapter } from '@twitchapi/helix';
import type { BaseConnectionOptions } from '../../types';
import type { WebhookConnection } from '../structures';

export type WebhookConnectionOptions = BaseConnectionOptions<WebhookConnection> & {
    appToken: TokenAdapter<'app', boolean>
    baseURL: string
    secret: string
    subscriptionRoute?: string
    startServer?: boolean
    dropSubsAtStart?: boolean
}