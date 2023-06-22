import { EventEmitter } from "node:events"
import { ChatBotEvents } from "../interfaces/ChatBotEvents";

/**
 * Custom EventEmitter for ChatBotEvent
 * @extends EventEmitter
 */
export class ChatBotEventEmitter extends EventEmitter{

    override on: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);
    override emit: (<K extends keyof ChatBotEvents>(event: K, ...args: ChatBotEvents[K]) => boolean) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, ...args: any[]) => boolean);

    override off: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);


    override once: (<K extends keyof ChatBotEvents>(event: K, listener: (...args: ChatBotEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof ChatBotEvents>, listener: (...args: any[]) => void) => this);

    override removeAllListeners: (<K extends keyof ChatBotEvents>(event?: K) => this) &
            (<S extends string | symbol>(event?: Exclude<S, keyof ChatBotEvents>) => this);

    public constructor(){
        super()
    }
}