/**
 * Represents a mention option.
 */
export class MentionOption<T extends null = null, K extends boolean = false>{
  /**
   * The type of the mention option. It's always mention.
   */
  
  public readonly type = 'mention';
  /**
   * The default value of the mention option. Always null as actually there is not planned way to set a default value.
   */

  public readonly defaultValue: T = null as T;

  /**
   * Whether the mention option is grouped into more than two types of mention.
   */
  public readonly grouped: K = false as K;

  /**
   * Creates a new instance of the mention option.
   * @param options The options of the mention option.
   */
  public constructor(options?: { grouped?: K }){
    this.grouped = options?.grouped ?? false as K;
  }
}