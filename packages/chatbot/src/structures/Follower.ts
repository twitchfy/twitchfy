import { ChatBot } from "../ChatBot";
import { FollowerUser } from "./FollowerUser";
import { GetFollowers } from "@twitchapi/api-types";

export class Follower{
   
    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The Twitch user of the follower.
     */
    public user: FollowerUser

    /**
     * @description The Date when the follower starts following the channel.
     */
    public followedAt: Date

    public constructor(chatbot: ChatBot, data: GetFollowers){

        this.chatbot = chatbot

        this.user = new FollowerUser(this.chatbot, data.user_id, data.user_login, data.user_name)

        this.followedAt = new Date(data.followed_at)

    }

    
}