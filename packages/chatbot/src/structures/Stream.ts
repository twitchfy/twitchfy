import { GetStream } from "@twitchapi/api-types"
import { ChatBot } from "../ChatBot"
import { Broadcaster } from "./Broadcaster"
import { CreatedClip } from "./CreatedClip"

export class Stream {

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The {@link Broadcaster broadcaster} of the stream.
     */
    public broadcaster: Broadcaster

    /**
     * @description The id of the stream.
     */
    public id: string

    /**
     * @description The id of the game that is playing in the stream.
     */
    public gameId: string

    /**
     * @description The name of the game that is playing in the stream.
     */
    public gameName: string

    /**
     * @description The type of stream. Usually is live.
     */
    public type: string

    /**
     * @description The title of the stream.
     */
    public title: string

    /**
     * @description A string array containing the stream's tags.
     */
    public tags: string[]

    /**
     * @description The viewerCount of the stream.
     */
    public viewerCount: number

    /**
     * @description A Date that represents when the stream started.
     */
    public startedAt: Date

    /**
     * @description The language code of the stream.
     */
    public language: string

    /**
     * @description The thumbnail url of the stream.
     */
    public thumbnailURL: string

    /**
     * @description A boolean value that indicates whether the stream is meant for mature audiences.
     */
    public isMature: boolean

    /**
     * 
     * @param chatbot 
     * @param data 
     */
    public constructor(chatbot: ChatBot, data: GetStream) {
        this.chatbot = chatbot
        this.broadcaster = new Broadcaster(this.chatbot, data.user_id, data.user_login, data.user_name)
        this.id = data.id
        this.gameId = data.game_id
        this.type = data.type
        this.title = data.title
        this.tags = data.tags
        this.viewerCount = data.viewer_count
        this.startedAt = new Date(data.started_at)
        this.language = data.language
        this.thumbnailURL = data.thumbnail_url.replace("{width}", "1920").replace("{height}", "1080")
        this.isMature = data.is_mature
    }

    /**
    * 
    * @param {boolean} delay If true there will be a delay an the clip wouldn't finish when the request is sent instead it would finish instants later.
    * @returns {Promise<CreatedClip>} Returns the {@link CreatedClip} object that contains the URL of the clip.
    */
    public async createClip(delay?: boolean) {

        return new CreatedClip(this.chatbot, await this.chatbot.helixClient.createClip(this.broadcaster.id, delay))
    }


}