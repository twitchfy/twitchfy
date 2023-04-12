import { ChatBot } from "../../ChatBot";
import { ClearChatTags } from "../../interfaces/tags/ClearChatTags";
import { User } from "../../structures/User";
import { WhisperBody } from "@twitchapi/helix";

/**
 * Represents the target user of the ClearChat event included in the response message.
 * @class
 */

export class ClearChatUser{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The id of the user who is the target of the ClearChat event.
     */
    public id: string

    /**
     * 
     * @param chatbot 
     * @param tags 
     */

    public constructor(chatbot: ChatBot, tags: ClearChatTags){
        this.chatbot = chatbot
        this.id = tags["target-user-id"]
    }

    /**
     * Send a whisper to this user.
     * @param {string} message The message you want to send to the user. You have to have the scope user:manage:whispers and the sender user has to have a verified phone number. 
     */
    public async sendWhisper(message: string){

        const whisperBody = new WhisperBody(message)

        await this.chatbot.helixClient.sendWhisper(this.chatbot.user.id, this.id, whisperBody)
    }

    /**
     * Get the whole {@link User} object with all the user's information.
     * @returns {Promise<User>} The {@link User} of this user.
     */

    public async fetch(): Promise<User>{
        return await this.chatbot.users.fetch(this.id)
    }
}