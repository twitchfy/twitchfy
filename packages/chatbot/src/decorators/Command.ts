import type { OptionsRecord } from '../types';
import type { EventSubConnection } from '../enums';
import type { Command } from '../structures';

/**
 * The options to build up a command.
 * @param name The name of the command.
 * @param options The options of the command.
 */ 
export interface CommandOptions {
    name: string
    options?: OptionsRecord;
}

/**
 * Define the command.
 * @param {CommandOptions} options The options to build up the command.
 * @returns {Function} The decorator function.
 */
export function SetCommand<T extends EventSubConnection = EventSubConnection>(options: CommandOptions){
  return function(constructor: new () => Command<T>){
    constructor.prototype.name = options.name;
    constructor.prototype.options = options.options;
  };
}