/* eslint-disable @typescript-eslint/ban-types */

import type { ChannelChatMessageMessage } from '@twitchfy/eventsub';
import type { CommandOptionsAux } from './CommandOptionsAux';
import type { OptionsRecord } from './OptionsRecord';
import type { EventSubConnection } from '../enums';
import type { EventSubConnectionMap } from '../interfaces';


/**
 * The data of a message.
 */
export type MessageData<T extends EventSubConnection, K extends OptionsRecord = {}> = MessageEventData<T> & RestData<T, K>;

/**
 * The data of a message event.
 */
export type MessageEventData<T extends EventSubConnection> = ChannelChatMessageMessage<EventSubConnectionMap[T]>

/**
 * The rest of data which builds up the {@link MessageData}.
 */
export type RestData<T extends EventSubConnection, K extends OptionsRecord = {}> = {
    prefix: string;
    commandName: string;
    options: CommandOptionsAux<T, K>;
}
