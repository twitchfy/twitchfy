/* eslint-disable @typescript-eslint/ban-types */

import type { TokenAdapter } from '@twitchfy/helix';
import type { BaseConnectionOptions } from '../../types';
import type { WebhookConnection } from '../structures';

/**
 * The options for bulding up a Webhook Connection.
 */
export type WebhookConnectionOptions = BaseConnectionOptions<WebhookConnection> & {
    /**
     * The app token used by this connection.
     */
    appToken: TokenAdapter<'app', boolean>
    /**
     * The base URL for the webhook callback.
     */
    baseURL: string
    /**
     * The secret used for creating subscriptions within this connection.
     */
    secret: string
    /**
     * The route for receiving Twitch messages.
     * @default /subscriptions
     */
    subscriptionRoute?: string
    /**
     * Whether to start the server when the connection is started.
     * @default false
     */
    startServer?: boolean
    /**
     * Whether to drop subscriptions at start. This will delete all subscriptions that are currently active within the client (only webhook created) to avoid duplicated subscriptions if any storage was set.
     * @default false
     */
    dropSubsAtStart?: boolean
}