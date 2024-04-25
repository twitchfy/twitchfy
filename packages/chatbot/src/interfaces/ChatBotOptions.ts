import type { HelixClientOptions, UserTokenAdapter } from '@twitchapi/helix';
import type { EventSubConnection } from '../enums';
import type { EventSubOptions } from '../types';
import type { TwitchContext } from '../structures';

/**
 * The options to build up a chatbot.
 */
export interface ChatBotOptions<T extends EventSubConnection = EventSubConnection> {
    /**
     * The client ID of the Twitch's application.
     */
    clientID: string
    /**
     * The client secret of the Twitch's application.
     */
    clientSecret: string
    /**
     * The user token of the chatbot Twitch account.
     */
    userToken: UserTokenAdapter<boolean>
    /**
     * The eventsub connection type of the chatbot. See {@link EventSubConnection}.
     */
    connectionType: T
    /**
     * The options to build up the eventsub connection. See {@link EventSubOptions}.
     */
    eventsub: EventSubOptions<T>
    /**
     * The paths of the diffrent resources of the chatbot. See {@link Paths}.
     */
    paths: Paths
    /**
     * A callback to set up the prefixes of the chatbot commands.
     * @param message The message sent by an user in a chatroom.
     * @returns The possible prefixes of the chatbot commands in an array.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    prefix?: (message: TwitchContext<{}, T>) => string[]
    /**
     * The operator to separate the options in the command.
     */
    optionOperator?: string

    /**
     * The options to build up the helix client.
     */
    helix?: Partial<HelixClientOptions>
}

/**
 * The paths of the diffrent resources of the chatbot.
 * @param commands The path of the commands.
 * @param output The path of the output source code.
 * @param events The path of the events.
 
 */
export interface Paths {
    /**
     * The path of the commands.
     */
    commands?: string
    /**
     * The path of the output source code.
     */
    output: string
    /**
     * The path of the events.
     */
    events?: string
}