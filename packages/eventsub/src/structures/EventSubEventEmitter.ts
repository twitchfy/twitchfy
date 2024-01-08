/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'node:events';
import { EventSubEvents } from '../interfaces/EventSubEvents';

export class EventSubEventEmitter extends EventEmitter{

  override on: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);
  override emit: (<K extends keyof EventSubEvents>(event: K, ...args: EventSubEvents[K]) => boolean) &
            (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, ...args: any[]) => boolean);

  override off: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);

  override once: (<K extends keyof EventSubEvents>(event: K, listener: (...args: EventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof EventSubEvents>, listener: (...args: any[]) => void) => this);

  override removeAllListeners: (<K extends keyof EventSubEvents>(event?: K) => this) &
            (<S extends string | symbol>(event?: Exclude<S, keyof EventSubEvents>) => this);

  public constructor(){
    super();
  }
}