import { PrivMSGTags } from "../../interfaces/tags/PrivMSGTags"
import { PrivMSGRepliedMessage } from "./PrivMSGRepliedMessage"
import { parseCommand, parseMessage } from "../../utils/ChatBotMessageParser"
import { ChatBot } from "../../ChatBot"
import { PrivMSGUser } from "./PrivMSGUser"
import { PrivMSGChannel } from "./PrivMSGChannel"
import { PrivMSGChatter } from "./PrivMSGChatter"


/**
 * @class
 * Represents the message sent by an user in a chat.
 */
export class PrivMSG{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The content of the message.
     */
    public content: string

    /**
     * @description The id of the message.
     */
    public id: string

    /**
     * @description The amount of bits that the message contains. This amount is null if the message do not contain bits.
     */
    public bits: number | null

    /**
     * @description The channel where the message was sent.
     */
    public channel: PrivMSGChannel

    /**
     * @description The chatter that sent this message.
     */
    public chatter: PrivMSGChatter

    /**
     * @description The user that sent this message
     */
    public user: PrivMSGUser

    /**
     * @description The UNIX timestamp when this message was sended.
     */
    public createdTimestamp : number

    /**
     * @description The message that was replied in this message. This is null if this message do not reply to another message.
     */
    public repliedMessage : PrivMSGRepliedMessage | null

    /**
     * 
     * @param chatbot 
     * @param data 
     * @param tags 
     */

    public constructor(chatbot: ChatBot, data: string, tags: PrivMSGTags){
        this.content = parseMessage(data, "parameters").slice(0, -2)
        this.chatbot = chatbot
        this.id = tags.id
        this.bits = tags.bits ? Number(tags.bits) : null
        this.createdTimestamp = Number(tags["tmi-sent-ts"])
        this.channel = new PrivMSGChannel(this.chatbot, tags["room-id"], parseCommand(data).channel.slice(1))
        this.chatter = new PrivMSGChatter(this.chatbot, tags, this.channel)
        this.user = new PrivMSGUser(this.chatbot, tags)
        this.repliedMessage = tags["reply-parent-msg-id"] ? new PrivMSGRepliedMessage(tags, chatbot, this.channel) : null


    }

    /**
     * Reply to this message.
     * @param {string} message The message that you want to send in the reply. 
     */
    public reply(message: string){

        this.chatbot.ws.sendMessage(`@reply-parent-msg-id=${this.id} PRIVMSG #${this.channel.name} :${message}`)
    }


    /**
     * Deletes this message. You have to have moderation permissions to delete this message.
     */
    public async delete(){
        await this.chatbot.helixClient.deleteMessage(this.id, this.chatbot.user.id, this.channel.id)
    }
}