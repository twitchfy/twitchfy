/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'node:events';
import { EventSubEvents } from '../interfaces';
import { ConnectionTypes } from '../types';

export type FixArray<T> = T extends [...infer X] ? X[] : any[];

export class EventSubEventEmitter<T extends ConnectionTypes = ConnectionTypes> extends EventEmitter {
  public constructor() {
    super();
  }

  override on<K extends keyof EventSubEvents<T>>(event: K, listener: EventSubEvents<T>[K]): this {

    return super.on(event, listener);

  }

  override emit<K extends keyof EventSubEvents<T>>(event: K, ...args: Parameters<EventSubEvents[K]>): boolean {

    return super.emit(event, ...args);

  }
}