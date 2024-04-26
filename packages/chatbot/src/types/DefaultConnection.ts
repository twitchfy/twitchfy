import type { EventSubConnection } from '../enums';

/**
 * The options to be declared in TypeScript
 */
export interface Options {}

/**
 * An infer type which will be used to determine the default connection type using TypeScript.
 */
export type DefaultConnection = Options extends { connection: infer T } ? T : EventSubConnection;