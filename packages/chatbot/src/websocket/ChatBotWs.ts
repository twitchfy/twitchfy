import { client, connection } from "websocket"
import { ChatBot } from "../ChatBot"
import { parseCommand, parseParameters, parseTags } from "../utils/ChatBotMessageParser"
import { ClearChat } from "../structures/ClearChat/ClearChat"
import { PrivMSG } from "../structures/PrivMSG/PrivMSG"
import { ClearMessage } from "../structures/ClearMessage/ClearMessage"
import { PrivMSGTags } from "../interfaces/tags/PrivMSGTags"
import { ClearChatTags } from "../interfaces/tags/ClearChatTags"
import { ClearMessageTags } from "../interfaces/tags/ClearMessageTags"
import { ChatBotUser } from "../structures/ChatBotUser"
import { JoinedChannel } from "../structures/JoinedChannel"
import { EventNames } from "../enums/EventNames"



/**
 * The ChatBot WebSocket client for handling connection to Twitch IRC Server.
 * @class
 * @extends client
 */

export class ChatBotWs extends client {

    /**
     * @description The current instance of the {@link ChatBot}
     */
    public chatbot: ChatBot

    /**
     * @description The nick of the ChatBot used to login with the Twitch IRC Server
     */
    public nick: string

    /**
     * @description The user access token of the ChatBot's Twitch User.
     */
    public oauth: string

    /**
     * @description The WebSocket connection to the Twitch IRC Server.
     */
    public connection: connection

    /**
     * 
     * @param chatbot
     * @param nick   
     * @param oauth 
     */

    public constructor(chatbot: ChatBot, nick: string, oauth: string) {

        super()

        this.chatbot = chatbot
        this.nick = nick
        this.oauth = oauth

    }

    /**
     * Used to establish the connection with Twitch IRC Server.
     * @returns {ChatBotWs} Returns the current instance of the WebSocket Client used to connect to Twitch IRC Server.
     */
    public login() {

        this.startup()
        this.connect('wss://irc-ws.chat.twitch.tv:443')

        return this

    }


    /**
     * Used to send messages to the Twitch IRC Server with the ChatBot.
     * @param {string} message Returns the message sent to the Twitch IRC Server.
     */
    public sendMessage(message: string) {
        this.connection.send(message)
    }

    /**
     * Used to get the ping of the websocket connection in ms.
     * @returns {number} Returns the ping of the websocket connnection's ping in ms.
     */

    public async getPing(): Promise<number>{

        return new Promise((resolve, rejected) => {

        this.connection.on("pong", (data) => {

            const pongTimestamp = new Date();
            const pingTimestamp = new Date(data.toString());

            return resolve(pongTimestamp.getTime() - pingTimestamp.getTime())

        })

        this.connection.ping(Buffer.from(new Date().toString()))

    })

    }


    /**
     * @private
     * Startup the WebSocket connection and establish the {@link ChatBotCapabilities} provided in the {@link ChatBotOptions} and handle Twitch IRC Server events. 
     */
    private startup() {
        this.on("connect", (connection) => {
            this.connection = connection
            let capabilities = "CAP REQ :";

            for (const key in this.chatbot.capabilities) {
                if (!this.chatbot.capabilities[key]) return
                capabilities += `twitch.tv/${key} `;
            }
            connection.send(capabilities.trim())

            connection.send(`PASS oauth:${this.oauth}`)

            connection.send(`NICK ${this.nick}`)


            this.chatbot.on(EventNames.Ready, () => {

                for (const channel of this.chatbot.options.channels ?? []) {
                    
                    this.chatbot.channels.join(channel)

                    this.chatbot.joinedChannels.push(new JoinedChannel(this.chatbot, channel))
                }
            })
            connection.on("message", async (message) => {

                if (message.type === "utf8") {

                    switch (parseCommand(message.utf8Data)?.command) {

                        case "001": {

                            const user = await this.chatbot.helixClient.getUser(parseCommand(message.utf8Data)?.channel)

                            this.chatbot.user = new ChatBotUser(this.chatbot, user)

                            this.chatbot.readyAt = new Date();

                            return this.chatbot.emit("ready")

                        }

                        case "CLEARCHAT": {
                            return this.chatbot.emit("CLEARCHAT", new ClearChat(this.chatbot, message.utf8Data, parseTags(message.utf8Data) as ClearChatTags))
                            break;
                        }

                        case "PRIVMSG": {
                            return this.chatbot.emit("PRIVMSG", new PrivMSG(this.chatbot, message.utf8Data, parseTags(message.utf8Data) as PrivMSGTags))
                            break;
                        }

                        case "CLEARCHAT": {
                            return this.chatbot.emit("CLEARMSG", new ClearMessage(this.chatbot, message.utf8Data, parseTags(message.utf8Data) as ClearMessageTags))
                            break;
                        }

                        case "NOTICE": {

                            if(this.chatbot.noticeLog){

                                const parameters = parseParameters(message.utf8Data, parseCommand(message.utf8Data))

                                return console.log("\x1b[33m%s\x1b[0m", `${parameters.channel} ${parameters.botCommandParams}`)
                            }
                        }

                    }

                }

                return void 0;
            })

        })
    }

}