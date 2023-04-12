import { ChatBot } from "../ChatBot"
import { User as UserResponse } from "@twitchapi/api-types"
import { WhisperBody } from "@twitchapi/helix"


export class User{
    public chatbot: ChatBot
    public id: string
    public login: string
    public displayName: string
    public type: string | null
    public broadcasterType: string
    public description: string
    public avatarURL: string
    public offlineImageURL: string
    public viewCount: number
    public createdAt: string

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
        this.viewCount = data.view_count
        this.createdAt = data.created_at
    }

    public async sendWhisper(message: string){

        const whisperBody = new WhisperBody(message)

        await this.chatbot.helixClient.sendWhisper(this.chatbot.user.id, this.id, whisperBody)
    }

    public async fetch(): Promise<User>{

        return await this.chatbot.users.fetch(this.id)
    }

}