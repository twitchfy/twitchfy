import type { createEvent } from '../functions';
import { loadFiles } from '../util';

/**
 * The event handler.
 */
export class EventHandler{

  /**
   * The directory of the events.
   */
  public readonly dir: string;

  /**
   * Creates a new instance of the event handler.
   * @param dir The directory of the events.
   */
  public constructor(dir: string){
    this.dir = dir;
  }

  /**
   * Load the events.
   * @returns The loaded events.
   */
  public async load(){
    return (await loadFiles<ReturnType<typeof createEvent>>(this.dir)).map((x) => x.default);
  }

}