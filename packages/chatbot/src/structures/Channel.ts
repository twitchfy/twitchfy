import { User } from "../structures/User"
import { ChatBot } from "../ChatBot"
import { Channel as ChannelResponse } from "@twitchapi/api-types"
import { BanManager } from "./managers/BanManager"
import { AnnouncementColor } from "../enums/AnnouncementColor"
import { AnnouncementBody } from "@twitchapi/helix"
import { Chat } from "./Chat"
import { AutoMod } from "./AutoMod"
import { JoinedChannel } from "./JoinedChannel"

/**
 * @class
 * Represents a Twitch Channel. If the origin of this channel is not the {@link ChannelManager} the information might be unupdated, to update this information use the fetch method.
 */

export class Channel {

    /**
     * @description The name of the channel.
     */
    public name: string

    /**
     * @description The user whose channel is.
     */

    public broadcaster: User

    /**
     * @description The public name the user has in any chat.
     */

    public displayName: string

    /**
     * @description The current instance of the {@link ChatBot}
     */

    public chatbot: ChatBot

    /**
     * @description The unique id of the user.
     */

    public id: string

    /**
     * @description The language of the current channel.
     */

    public language: string

    /**
     * @description The unique id of the game that the broadcaster is playing or last played.
     */

    public gameId: string

    /**
     * @description The name of the game that the broadcaster is playing or last played.
     */
    public gameName: string

    /**
     * @description The title of the stream that the broadcaster is currently streaming or last streamed.
     */
    public title: string

    /**
     * @description The value of the broadcaster’s stream delay setting, in seconds. If the channel is not the ChatBot's channel the delay is 0. Instead of use this property is recommended to fetch the channel settings.
     */
    public delay: number

    /**
     * @description The tags applied to the channel.
     */

    public tags: string[]

    /**
     * @description The {@link BanManager} of this channel.
     */
    public bans: BanManager

    /**
     * @description The {@link Chat} of this channel.
     */
    public chat: Chat

    /**
     * @description The {@link AutoMod} of the chat.
     */
    public automod: AutoMod

    /**
     * 
     * @param data 
     * @param user 
     * @param chatbot
     */

    public constructor(chatbot: ChatBot, data: ChannelResponse, user: User) {
        this.chatbot = chatbot
        this.name = data.broadcaster_login
        this.broadcaster = user
        this.bans = new BanManager(this.chatbot, this)
        this.displayName = data.broadcaster_name
        this.id = data.broadcaster_id
        this.language = data.broadcaster_language
        this.gameId = data.game_id
        this.gameName = data.game_name
        this.title = data.title
        this.delay = data.delay
        this.tags = data.tags
        this.chat = new Chat(this.chatbot, this)
        this.automod = new AutoMod(this.chatbot, this)

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
    public async fetch() {

        return await this.chatbot.channels.fetch(this.id)

    }
}