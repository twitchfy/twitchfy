import { ClearMessageTags } from "../../interfaces/tags/ClearMessageTags"
import { ChatBot } from "../../ChatBot"
import { User } from "../../structures/User"

/**
 * @class
 * Represents the user whose message was deleted in the ClearMessage event.
 */
export class ClearMessageUser{

    /**
     * @description The current instance of the {@link ChatBot}
     */
    public chatbot: ChatBot

    /**
     * @description The login name of the user.
     */
    public login: string

    /**
     * 
     * @param chatbot 
     * @param tags 
     */
    public constructor(chatbot: ChatBot, tags: ClearMessageTags){
        this.chatbot = chatbot
        this.login = tags.login
    }

    /**
     * Get the whole {@link User} object with all the user's information.
     * @returns {Promise<User>} The {@link User} of this user.
     */
    public async fetch(): Promise<User>{
        return await this.chatbot.users.fetch(this.login)
    }
}