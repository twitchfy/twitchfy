import { Channel } from "../Channel";
import { ChatBot } from "../../ChatBot";
import { User } from "../User";
import { JoinedChannel } from "../JoinedChannel";

/**
 * Represents the ChannelManager of the ChatBot.
 * @class
 */

export class ChannelManager{

    /**
     * @description The current instance of the {@link ChatBot}.
     */


    public chatbot: ChatBot

    /**
     * @public
     * @param chatbot 
     */

    public constructor(chatbot: ChatBot){
        
        this.chatbot = chatbot

    }

    /**
     * 
     * Use to get any Twitch channel information.
     * @param {string} channelIdentificator The fetched channel's id or name. 
     * @returns {Promise<Channel>} Returns {@link Channel}.
     */
    public async fetch(channelIdentificator: string): Promise<Channel> {
        const userResponse = await this.chatbot.helixClient.getUser(channelIdentificator)

        const channelResponse = await this.chatbot.helixClient.getChannel(userResponse.id)

        const channel = new Channel(this.chatbot, channelResponse, new User(this.chatbot, userResponse))

        return channel
    }

    /**
     * 
     * Use to join to a Twitch channel to receive events.
     * @param {string} channelName The channel name of the channel the chatbot will join.
     * @returns {JoinedChannel} Returns {@link JoinedChannel}.
     */

    public join(channelName: string): JoinedChannel {
       
        const channel = new JoinedChannel(this.chatbot, channelName)

        if(this.chatbot.joinedChannels.find((x) => x.name === channel.name)) return channel;

        this.chatbot.ws.sendMessage(`JOIN #${channel.name}`)

        this.chatbot.joinedChannels.push(channel)

        this.chatbot.emit("JOIN", channel)

        return channel

    }

    /**
     * 
     * @param {string} channelName The channel name of the channel the chatbot will leave.
     * @returns {JoinedChannel} Returns the {@link JoinedChannel} of the channel the ChatBot left.
     */

    public leave(channelName: string): JoinedChannel {

        const channel = new JoinedChannel(this.chatbot, channelName)

        const index = this.chatbot.joinedChannels.findIndex((x) => x.name === channelName)

        if(index === -1) return channel

        this.chatbot.joinedChannels.splice(index, 1)

        this.chatbot.ws.sendMessage(`PART #${channelName}`)

        return channel
    }
}