import type { HelixClientOptions, UserTokenAdapter } from '@twitchapi/helix';
import type { EventSubConnection } from '../enums';
import type { EventSubOptions } from '../types';
import type { CommandContext } from '../structures';

/**
 * The options to build up a chatbot.
 * @param clientID The client ID of the Twitch's application.
 * @param clientSecret The client secret of the Twitch's application.
 * @param userToken The user token of the chatbot Twitch account.
 * @param connectionType The eventsub connection type of the chatbot. See {@link EventSubConnection}.
 * @param eventsub The options to build up the eventsub connection. See {@link EventSubOptions}.
 * @param paths The paths of the diffrent resources of the chatbot. See {@link Paths}.
 * @param prefix A callback which expects the chatbot command's prefixes to be returned.
 * @param optionOperator The operator to separate the options in the command.
 * @param helix The options to build up the helix client.
 */
export interface ChatBotOptions<T extends EventSubConnection = EventSubConnection> {
    clientID: string
    clientSecret: string
    userToken: UserTokenAdapter<boolean>
    connectionType: T
    eventsub: EventSubOptions<T>
    paths: Paths
    // eslint-disable-next-line @typescript-eslint/ban-types
    prefix: (message: CommandContext<{}, T>) => string[]
    optionOperator?: string
    helix?: Partial<HelixClientOptions>
}

/**
 * The paths of the diffrent resources of the chatbot.
 * @param commands The path of the commands.
 * @param output The path of the output source code.
 * @param events The path of the events.
 
 */
export interface Paths {
    commands: string
    output: string
    events?: string
}