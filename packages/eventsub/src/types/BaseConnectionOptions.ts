import type { HelixClientOptions } from '@twitchfy/helix';
import type { ConnectionTypes } from './ConnectionTypes';
import type { LoggerOptions } from '../logger';
import type { StorageOptions } from '../interfaces';

/**
 * The options for building a base connection.
 */
export type BaseConnectionOptions<K extends ConnectionTypes> = {
    /**
     * The client ID of the application.
     */
    clientId: string
    /**
     * The client secret of the application.
     */
    clientSecret: string
    /**
     * The options for the storage of subscriptions.
     */
    storage: StorageOptions<K>
    /**
     * Whether to maintain subscriptions when the process is restarted.
     */
    maintainSubscriptions?: true
    /**
     * The options for building a custom Helix client within the connection.
     */
    helix?: Partial<HelixClientOptions>
    /**
     * The options for the logger.
     */
    logger?: LoggerOptions
    /**
     * Whether to enable debug mode.
     */
    debug?: boolean
} | {
    /**
     * The client ID of the application.
     */
    clientId: string
    /**
     * The client secret of the application.
     */
    clientSecret: string
    /**
     * The options for the storage of subscriptions.
     */
    maintainSubscriptions: false
    /**
     * The options for building a custom Helix client within the connection.
     */
    helix?: Partial<HelixClientOptions>
    /**
     * The options for the logger.
     */
    logger?: LoggerOptions
    /**
     * Whether to enable debug mode.
     */
    debug?: boolean
}