/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'node:events';
import { WebsocketEventSubEvents } from '../interfaces';

export class WebhookEventSubEventEmitter extends EventEmitter{

  override on: (<K extends keyof WebsocketEventSubEvents>(event: K, listener: (...args: WebsocketEventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof WebsocketEventSubEvents>, listener: (...args: any[]) => Promise<void> | void) => this);
  override emit: (<K extends keyof WebsocketEventSubEvents>(event: K, ...args: WebsocketEventSubEvents[K]) => boolean) &
            (<S extends string | symbol>(event: Exclude<S, keyof WebsocketEventSubEvents>, ...args: any[]) => boolean);

  override off: (<K extends keyof WebsocketEventSubEvents>(event: K, listener: (...args: WebsocketEventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof WebsocketEventSubEvents>, listener: (...args: any[]) => Promise<void> | void) => this);

  override once: (<K extends keyof WebsocketEventSubEvents>(event: K, listener: (...args: WebsocketEventSubEvents[K]) => void) => this) &
            (<S extends string | symbol>(event: Exclude<S, keyof WebsocketEventSubEvents>, listener: (...args: any[]) => Promise<void> | void) => this);

  override removeAllListeners: (<K extends keyof WebsocketEventSubEvents>(event?: K) => this) &
            (<S extends string | symbol>(event?: Exclude<S, keyof WebsocketEventSubEvents>) => this);

  public constructor(){
    super();
  }
}