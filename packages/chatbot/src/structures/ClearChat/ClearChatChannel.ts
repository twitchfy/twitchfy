import { ChatBot } from "../../ChatBot"
import { AnnouncementBody } from "@twitchapi/helix"
import { AnnouncementColor } from "../../enums/AnnouncementColor"
import { JoinedChannel } from "../JoinedChannel"
import { Channel } from "../Channel"
import { Follower } from "../Follower"
import { StreamManager } from "../managers/StreamManager"

/**
 * @class
 * Represent the Channel where the ClearChat event was fired.
 */
export class ClearChatChannel{

    /**
     * @description The current instance of the {@link ChatBot}
     */
    public chatbot: ChatBot

    /**
     * @description The name of the channel.
     */
    public name: string
    
    /**
     * @description The id of the channel.
     */
    public id: string

    /**
     * @description The {@link StreamManager} of the channel.
     */
    public stream: StreamManager

    /**
     * 
     * @param chatbot 
     * @param name 
     * @param id 
     */

    public constructor(chatbot: ChatBot, name: string, id: string){
        this.chatbot = chatbot
        this.name = name
        this.id = id
        this.stream = new StreamManager(this.chatbot, this)
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
    public leave() : JoinedChannel {

        const channel = this.chatbot.channels.leave(this.name)

        this.chatbot.emit("LEAVE", channel)

        return channel
    }



    /**
     * Get the whole {@link Channel} object with all the channel's information.
     * @returns {Promise<Channel>} Returns a complete {@link Channel}.
     */
    public async fetch() : Promise<Channel>{

        return await this.chatbot.channels.fetch(this.id)

    }

    /**
     * Get the number of followers of this channel.
     * @returns {Promise<number>} Returns the number of followers that follow this channel.
     */
    public async getFollowerCount(): Promise<number>{

        return await this.chatbot.helixClient.getChannelFollowerCount(this.id)

    }

    /**
     * Retrieve all followers of the channel. If the chatbot is not a moderator of that channel, an empty array will be returned.
     * @returns {Promise<Follower[]>} Returns an array that contains each follower of that channel.
     */
    public async getFollowers(): Promise<Follower[]>{

        const followers = await this.chatbot.helixClient.getChannelFollowers(this.id)

        return followers.map((x) => new Follower(this.chatbot, x))

    }

    /**
     * 
     * @param {string} userID The userID of the follower you want to get.
     * @returns {Promise<Follower | null>} Returns the {@link Follower} if the user is following the channel, if not a nullish value will be returned.
     */
    public async getFollower(userID: string): Promise<Follower | null >{

        const follower = await this.chatbot.helixClient.getChannelFollower(this.id, userID)

        if(!follower) return null

        return new Follower(this.chatbot, follower)
    }

    public async inStream() : Promise<Boolean>{

        const stream = await this.stream.fetch()

        return !!stream
    }
}