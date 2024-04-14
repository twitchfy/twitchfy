/**
 * A collection of key-value pairs.
 * @extends Map
 */
export class Collection<T extends string | number | symbol, V> extends Map<T, V> {

  /**
   * Creates a new collection.
   * @param entries The entries to set in the collection.
   */
  public constructor(entries?: readonly (readonly [T, V])[] | null){
    super(entries);
  }

  /**
   * Finds the first value that satisfies the condition.
   * @param fn The function to execute.
   * @returns Returns the value if found, otherwise undefined.
   */
  public find(fn: (value: V, key: T, collection: this) => boolean): V | undefined {
    for (const [key, value] of this){
      if (fn(value, key, this)){
        return value;
      }
    }
    return undefined;
  }

  /**
   * Filters the collection by a condition.
   * @param fn The function to execute.
   * @returns The filtered collection.
   */
  public filter(fn: (value: V, key: T, collection: this) => boolean): Collection<T, V> {
    const results = new Collection<T, V>();
    for (const [key, value] of this){
      if (fn(value, key, this)){
        results.set(key, value);
      }
    }
    return results;
  }

  /**
   * Maps the collection.
   * @param fn The function to execute.
   * @returns The mapped collection.
   */
  public map<T2>(fn: (value: V, key: T, collection: this) => T2): Collection<T, T2> {
    const results = new Collection<T, T2>();
    for (const [key, value] of this){
      results.set(key, fn(value, key, this));
    }
    return results;
  }

  /**
   * Checks if any value satisfies the condition.
   * @param fn The function to execute.
   * @returns Whether any value satisfies the condition.
   */
  public some(fn: (value: V, key: T, collection: this) => boolean): boolean {
    for (const [key, value] of this){
      if (fn(value, key, this)){
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if every value satisfies the condition.
   * @param fn The function to execute.
   * @returns Whether every value satisfies the condition.
   */
  public every(fn: (value: V, key: T, collection: this) => boolean): boolean {
    for (const [key, value] of this){
      if (!fn(value, key, this)){
        return false;
      }
    }
    return true;
  }

  /**
   * Reduces the collection to a single value.
   * @param fn The function to execute.
   * @param initial The initial value.
   * @returns The reduced value.
   */
  public reduce<T2>(fn: (accumulator: T2, value: V, key: T, collection: this) => T2, initial: T2): T2 {
    let accumulator = initial;
    for (const [key, value] of this){
      accumulator = fn(accumulator, value, key, this);
    }
    return accumulator;
  }

  /**
   * Returns the first value of the collection.
   * @returns The first value of the collection.
   */
  public first(): V | undefined {
    return this.values().next().value;
  }

  /**
   * Transform the collection into an array containing the values of it.
   * @returns The array containing the values of the collection.
   */
  public toArray(): V[] {
    return [...this.values()];
  }
}