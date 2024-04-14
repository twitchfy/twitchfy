import type { OptionOptions } from '../interfaces';

/**
 * Represents a string option.
 */
export class StringOption<T extends string | null = null> {
  /**
   * The type of the option. It's always string.
   */
  public readonly type = 'string';

  /**
   * The default value of the option.
   */
  public readonly defaultValue: T | null;

  /**
   * Creates a new instance of the string option.
   * @param options The options of the string option.
   */
  public constructor(options?: OptionOptions<T>){
    this.defaultValue = options?.defaultValue  ?? null as T;
  }
}