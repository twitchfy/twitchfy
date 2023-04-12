import { ChatSettings } from "../../structures/ChatSettings";
import { ChatBot } from "../../ChatBot";
import { Chat } from "../../structures/Chat";

/**
 * Represent the ChatSettingsManager of a channel.
 * @class
 */

export class ChatSettingsManager {


    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot


    /**
     * @description The chat of the ChatSettingsManager.
     */
    public chat: Chat

    /**
     * 
     * @param chatbot 
     * @param chat
     */
    public constructor(chatbot: ChatBot, chat: Chat) {
        this.chatbot = chatbot
        this.chat = chat
    }

    /**
     * Get the ChatSettings of the current ChatSettingsManager's channel
     * @returns {Promise<ChatSettings>} Returns {@link ChatSettings}.
     */

    public async fetch(): Promise<ChatSettings> {
        return new ChatSettings(this.chatbot, await this.chatbot.helixClient.getChatSettings(this.chat.channel.id, this.chatbot.user.id), this.chat.channel)
    }
}