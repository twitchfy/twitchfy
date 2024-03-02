import type { UserTokenAdapter } from '@twitchapi/helix';
import type { ChatBotCapabilities } from './ChatBotCapabilities';
import type { ConnectionType } from '../enums/ConnectionType';

/**
 * The options for building the {@link ChatBot}.
 * @interface
 */
export interface ChatBotOptions{
    clientID: string
    clientSecret: string
    connectionType: ConnectionType
    auth: UserTokenAdapter<boolean>
    nick: string
    capabilities?: ChatBotCapabilities
    channels?: string[]
    noticeLog?: boolean
}