import type { ChatBotCapabilities } from './ChatBotCapabilities';

/**
 * The options for building the {@link ChatBot}.
 * @interface
 */
export interface ChatBotOptions{
    clientID: string,
    oauth: string,
    nick: string
    capabilities?: ChatBotCapabilities
    channels?: string[]
    noticeLog?: boolean
}