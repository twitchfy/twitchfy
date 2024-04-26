import type { EventSubConnection } from '../enums';
import type { DefaultConnection, EventData, Events } from '../types';

/**
 * The data received from an event.
 */
export type EventDataForConnection<T extends EventSubConnection> = {
    [K in Events]: EventData<T, K>
}

/**
 * Function to create an event.
 * @param data The {@link EventData} to create the event.
 */
export function createEvent<T extends EventSubConnection = DefaultConnection>(data: EventDataForConnection<T>[keyof EventDataForConnection<T>]){
  return data;
}