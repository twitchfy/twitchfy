import { ChatBot } from "../ChatBot";
import { User } from "./User";
import { User as UserResponse } from "@twitchapi/api-types";

/**
 * Represents the Twitch's user of the ChatBot.
 * @class
 * @extends User
 */

export class ChatBotUser extends User{

    /**
     * 
     * @param chatbot
     * @param user
     */
    public constructor(chatbot: ChatBot, user: UserResponse){
        super(chatbot, user)
    }

    /**
     * Sets the name color in the chat of the ChatBot.
     * @param {string} color The name color you are going to assign to the ChatBot. To specify an hex color code, the user must be a Turbo or Prime user.
     */
    public async setNameColor(color: string){

        
        await this.chatbot.helixClient.updateUserColor(this.id, color)
    }
}
