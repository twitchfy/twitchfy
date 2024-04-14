/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ChatBot } from '../structures';
import type { EventsMap } from '../interfaces';
import type { Events } from '../types';
import type { EventSubConnection } from '../enums';

/**
 * The data of the event.
 * @param event The event to run.
 * @param run The function to run the event.
 */
export type EventData<T extends EventSubConnection, K extends Events> = {
    event: K,
    // @ts-ignore
    run: (chatbot: ChatBot<T>, data: EventsMap<T>[K]) => any
}