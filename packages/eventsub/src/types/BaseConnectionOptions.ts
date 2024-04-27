import type { HelixClientOptions } from '@twitchfy/helix';
import type { ConnectionTypes } from './ConnectionTypes';
import type { LoggerOptions } from '../logger';
import type { StorageOptions } from '../interfaces';

export type BaseConnectionOptions<K extends ConnectionTypes> = {
    clientId: string
    clientSecret: string
    storage: StorageOptions<K>
    maintainSubscriptions?: true
    helix?: Partial<HelixClientOptions>
    logger?: LoggerOptions
    debug?: boolean
} | {
    clientId: string
    clientSecret: string
    maintainSubscriptions: false
    helix?: Partial<HelixClientOptions>
    logger?: LoggerOptions
    debug?: boolean
}