import { ChatBot } from "../ChatBot"

export class JoinedChannel {
    
    public chatbot: ChatBot
    public name: string

    public constructor(chatbot: ChatBot, name: string) {
        this.chatbot = chatbot
        this.name = name
    }

    /**
     * Send a message to the channel.
     * @param {string} message The message that is going to be sent to the channel.
     */

    public sendMessage(message: string) {

        this.chatbot.ws.sendMessage(`PRIVMSG #${this.name} :${message}`)

    }

    /**
     * Connects the ChatBot to the chat of the channel.
     * @returns {JoinedChannel} The {@link JoinedChannel}.
     */
    public join(): JoinedChannel {

        const channel = this.chatbot.channels.join(this.name)

        this.chatbot.emit("JOIN", channel)

        return channel

    }

    /**
     * Disconnect the ChatBot to the chat of the channel.
     * @returns {JoinedChannel} The {@link JoinedChannel} that the bot has disconnected.
     */

    public leave(): JoinedChannel {

        const channel = this.chatbot.channels.leave(this.name)

        this.chatbot.emit("LEAVE", channel)

        return channel
    }

    /**
     * Get the whole {@link Channel} object with all the channel's information.
     * @returns {Promise<Channel>} Returns a complete {@link Channel}.
     */
    public async fetch() {

        return await this.chatbot.channels.fetch(this.name)

    }
}