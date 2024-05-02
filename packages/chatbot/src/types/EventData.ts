/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ChatBot } from '../structures';
import type { EventsMap } from '../interfaces';
import type { Events } from '../types';
import type { EventSubConnection } from '../enums';

/**
 * The data of the event.
 */
export type EventData<T extends EventSubConnection, K extends Events> = {
    /**
     * The event to run.
     */
    event: K,
    /**
     * The function which will be run when the event is triggered.
     * @param chatbot The current instance of the chatbot.
     * @param data The data of the event.
     * @returns 
     */
    // @ts-ignore
    run: (chatbot: ChatBot<T>, data: EventsMap<T>[K]) => any
}