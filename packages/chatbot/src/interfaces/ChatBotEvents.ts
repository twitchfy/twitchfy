import type { PrivMSG } from '../structures/PrivMSG/PrivMSG';
import type { ClearChat } from '../structures/ClearChat/ClearChat';
import type { ClearMessage } from '../structures/ClearMessage/ClearMessage';
import type { JoinedChannel } from '../structures/JoinedChannel';
import type { ChatBot } from '../ChatBot';

/**
 * The events of the {@link ChatBot}.
 * @interface
 */
export interface ChatBotEvents {
    PRIVMSG: [message: PrivMSG]
    CLEARCHAT: [message: ClearChat]
    CLEARMSG: [message: ClearMessage]
    JOIN: [channel: JoinedChannel]
    LEAVE: [channel: JoinedChannel]
    ready: [client: ChatBot]
}