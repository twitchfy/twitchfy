import type { DefaultConnection, OptionsRecord } from '../types';
import type { EventSubConnection } from '../enums';
import type { ChatCommand } from '../structures';

/**
 * The options to build up a command.
 */ 
export interface CommandOptions {
    /**
     * The name of the command.
     */
    name: string
    /**
     * The options of the command.
     */
    options?: OptionsRecord;
}

/**
 * Define the command.
 * @param {CommandOptions} options The options to build up the command.
 * @returns {Function} The decorator function.
 */
export function SetCommand<T extends EventSubConnection = DefaultConnection>(options: CommandOptions){
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  return <K extends { new (...args: any[]): ChatCommand<T> }>(target: K) =>
    class extends target {
      override name = options.name;
      override options = options.options;
    };
}