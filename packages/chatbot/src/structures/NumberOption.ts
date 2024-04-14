import type { OptionOptions } from '../interfaces';

/**
 * Represents a number option.
 */
export class NumberOption<T extends number | null = null> {
  /**
   * The type of the option. It's always number.
   */
  public readonly type = 'number';

  /**
   * The default value of the option.
   */
  public readonly defaultValue: T | null;

  /**
   * Creates a new instance of the number option.
   * @param options The options of the number option.
   */
  public constructor(options?: OptionOptions<T>){
    this.defaultValue = options?.defaultValue ?? null as T;
  }
}