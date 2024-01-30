/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'node:events';
import type { EventSubEvents } from '../interfaces';
import type { ConnectionTypes } from '../types';

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