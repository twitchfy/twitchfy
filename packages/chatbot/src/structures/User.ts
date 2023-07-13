import { ChatBot } from "../ChatBot"
import { User as UserResponse } from "@twitchapi/api-types"
import { WhisperBody } from "@twitchapi/helix"


export class User{

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The user's id
     */
    public id: string

    /**
     * @description The user's login name.
     */
    public login: string

    /**
     * @description The user's name that is displayed in the chat. This name is like the login name but can have UpperCase letters.
     */
    public displayName: string

    /**
     * @description The user type. It can be null if the user is a normal Twitch user.
     */
    public type: string | null

    /**
     * @description The broadcaster type. It can be an affiliate, a partner or a normal user.
     */
    public broadcasterType: string | null

    /**
     * @description The user's profile description.
     */
    public description: string

    /**
     * @description The url of the user's avatar.
     */
    public avatarURL: string

    /**
     * @description The offline image url of the user.
     */
    public offlineImageURL: string

    /**
     * @description The string that represents when the user was created.
     */
    public createdAt: Date

    /**
     * @param chatbot 
     * @param data 
     */
    public constructor(chatbot: ChatBot, data: UserResponse){
        this.chatbot = chatbot
        this.id = data.id
        this.login = data.login
        this.displayName = data.display_name
        this.type = data.type === "" ? null : data.type
        this.broadcasterType = data.broadcaster_type === "" ? null: data.broadcaster_type
        this.description = data.description
        this.avatarURL = data.profile_image_url
        this.offlineImageURL = data.offline_image_url
        this.createdAt = new Date(data.created_at)
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