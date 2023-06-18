import { PrivMSGTags } from "../../interfaces/tags/PrivMSGTags"
import { ChatBot } from "../../ChatBot"
import { BanBody, TimeoutBody} from "@twitchapi/helix"
import { PrivMSGBadges } from "../PrivMSG/PrivMSGBadges"
import { BanOptions } from "../../interfaces/BanOptions"
import { TimeoutOptions } from "../../interfaces/TimeoutOptions"
import { PrivMSGUser } from "../PrivMSG/PrivMSGUser"
import { PrivMSGChannel } from "./PrivMSGChannel"
import { Chatter } from "../Chatter"
import { Ban } from "../Ban"


/**
 * @class
 * Represents the Chatter that sent the PrivMSG.
 */
export class PrivMSGChatter{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The channel where the chatter sent the message. 
     */
    public channel: PrivMSGChannel

    /**
     * @private
     * @description The tags received from the Twitch IRC server, which are used to access to those tags outside the class constructor.
     */
    private tags: PrivMSGTags

    /**
     * @description The badges that the chatter has in his chat profile of the chat.
     */
    public badges: PrivMSGBadges

    /**
     * @description The user's id of the chatter.
     */
    public id: string

    /**
     * @description The login name of this chatter.
     */
    public login: string

    /**
     * @description The user's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */
    public displayName: string

    /**
     * @description The color of the user's displayName in the chat. This is an hexadecimal RGB color code.
     */
    public color: string

    /**
     * @description If the user is a subscriber of the channel.
     */
    public subscriber: boolean

    /**
     * @description If the user is a vip of that channel.
     */
    public vip: boolean

    /**
     * @description If the user is a mod in that channel.
     */
    public mod: boolean

    /**
     * @description If the user is a turbo subscriber.
     */
    public turbo: boolean

    /**
     * @description The chatter's user profile.
     */
    public user: PrivMSGUser

    /**
     * 
     * @param chatbot 
     * @param tags 
     * @param channel 
     */
    public constructor(chatbot: ChatBot, tags: PrivMSGTags, channel: PrivMSGChannel){

        this.chatbot = chatbot
        this.channel = channel
        this.badges = new PrivMSGBadges(tags)
        this.id = tags["user-id"]
        this.displayName = tags["display-name"]
        this.login = this.displayName.toLowerCase()
        this.color = tags.color
        this.subscriber = tags.subscriber === "0" ? false: true
        this.vip = tags.vip === "0" ? false: true
        this.mod = tags.mod === "0" ? false: true
        this.turbo = tags.turbo === "0" ? false : true
        this.user = new PrivMSGUser(this.chatbot, tags)


    }

    /**
     * Ban the chatter from the chat of the channel.
     * @param {BanOptions} options The {@link BanOptions options} that you can complete to ban the user. 
     * @returns {Ban} Returns a {@link Ban} class that represents the ban.
     */
    public async ban(options?: BanOptions): Promise<Ban> {

        const banBody = new BanBody(this.id, options?.reason)

        return new Ban(this.chatbot, await this.chatbot.helixClient.banUser(this.channel.id, this.chatbot.user.id, banBody))
    }

    /**
     * Timeout the chatter from the chat of the channel.
     * @param {TimeoutOptions} options The {@link TimeoutOptions options} of the timeout. 
     * @returns {Ban} Returns a {@link Ban} class that represents the timeout.
     */
    public async timeout(options: TimeoutOptions): Promise<Ban> {

        const timeoutBody = new TimeoutBody(this.id, options.duration, options.reason)

        return new Ban(this.chatbot, await this.chatbot.helixClient.timeoutUser(this.channel.id , this.chatbot.user.id, timeoutBody))

    }

    /**
     * Get the complete chatter information.
     * @returns {Chatter} Returns the complete chatter information including the complete channel.
     */
    public async fetch() {

        return new Chatter(this.chatbot, this.tags, await this.channel.fetch())
    }


    /**
    * Check if the chatter is the channel's broadcaster.
    * @returns {boolean} Returns a boolean whatever the chatter is the channel's broadcaster or not.
    */

    public isBroadcaster(): boolean {
        return this.badges.has("broadcaster")
    }

}