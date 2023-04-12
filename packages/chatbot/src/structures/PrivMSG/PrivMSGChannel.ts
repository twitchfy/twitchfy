import { ChatBot } from "../../ChatBot";
import { AnnouncementBody } from "@twitchapi/helix";
import { AnnouncementColor } from "../../enums/AnnouncementColor";
import { JoinedChannel } from "../JoinedChannel";
import { Channel } from "../Channel";

/**
 * @class
 * Represents the channel where the PrivMSG was sent.
 */
export class PrivMSGChannel{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The id of the channel.
     */
    public id: string

    /**
     * @description The name of the channel.
     */
    public name: string

    /**
     * 
     * @param chatbot 
     * @param id 
     * @param name 
     */

    public constructor(chatbot: ChatBot, id: string, name: string){
        this.chatbot = chatbot
        this.id = id
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
     * Send an announcement to the chat where everyone can see it.
     * @param {string} message The message of the announcement to send.
     * @param {AnnouncementColor} color The color of the announcement to send.
     */

    public async sendAnnouncement(message: string, color: AnnouncementColor) {
        const announcementBody = new AnnouncementBody(message, color)
        await this.chatbot.helixClient.sendAnnouncement(this.id, this.chatbot.user.id, announcementBody)
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
    public async fetch() : Promise<Channel>{

        return await this.chatbot.channels.fetch(this.name)

    }
    
}