import { PrivMSG } from "../structures/PrivMSG/PrivMSG"
import { ClearChat } from "../structures/ClearChat/ClearChat"
import { ClearMessage } from "../structures/ClearMessage/ClearMessage"
import { JoinedChannel } from "../structures/JoinedChannel"

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
    ready: []
}