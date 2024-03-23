import type { UserTokenAdapter } from '@twitchapi/helix';
import type { ChatBotCapabilities } from './ChatBotCapabilities';

/**
 * The options for building the {@link ChatBot}.
 * @interface
 */
export interface ChatBotOptions{
    clientID: string
    clientSecret: string
    auth: UserTokenAdapter<boolean>
    nick: string
    capabilities?: ChatBotCapabilities
    channels?: string[]
    noticeLog?: boolean
}