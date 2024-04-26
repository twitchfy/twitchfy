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
  return function(constructor: new () => ChatCommand<T>){
    constructor.prototype.name = options.name;
    constructor.prototype.options = options.options;
  };
}