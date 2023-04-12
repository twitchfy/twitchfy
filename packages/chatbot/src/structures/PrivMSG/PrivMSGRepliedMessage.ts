import { ChatBot } from "../../ChatBot"
import { PrivMSGTags } from "../../interfaces/tags/PrivMSGTags"
import { PrivMSGRepliedMessageChatter } from "./PrivMSGRepliedMessageChatter"
import { PrivMSGUser } from "./PrivMSGUser"
import { PrivMSGChannel } from "./PrivMSGChannel"

/**
 * @class
 * Represents the replied message of a PrivMSG.
 */
export class PrivMSGRepliedMessage{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The id of the message.
     */
    public id: string

    /**
     * @description The content of the message.
     */
    public content: string

    /**
     * @description The channel where the message was sent.
     */
    public channel: PrivMSGChannel

    /**
     * @description The chatter that sent this message.
     */
    public chatter: PrivMSGRepliedMessageChatter

    /**
     * @description The user that sent this message.
     */
    public user: PrivMSGUser

    /**
     * 
     * @param tags 
     * @param chatbot 
     * @param channel 
     */
    public constructor(tags: PrivMSGTags, chatbot: ChatBot, channel: PrivMSGChannel){
        this.chatbot = chatbot
        this.id = tags["reply-parent-msg-id"]
        this.content = tags["reply-parent-msg-body"]
        this.channel = channel
        this.chatter = new PrivMSGRepliedMessageChatter(this.chatbot, tags, this.channel)
        this.user = new PrivMSGUser(this.chatbot, tags)
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