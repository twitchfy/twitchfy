import type { OptionOptions } from '../interfaces';

/**
 * Represents a boolean option for a command.
 */
export class BooleanOption<T extends boolean | null = null> {

  /**
   * The type of the option. Set to boolean.
   */
  public readonly type = 'boolean';

  /**
   * The default value of the option.
   */
  public readonly defaultValue: T | null;

  /**
   * Create a new boolean option.
   * @param options The options for the boolean option.
   */
  public constructor(options?: OptionOptions<T>){
    this.defaultValue = options?.defaultValue ?? null as T;
  }
}