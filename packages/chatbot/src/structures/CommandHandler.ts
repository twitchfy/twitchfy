import type { ChatCommand } from './ChatCommand';
import { loadFiles } from '../util';

/**
 * The command handler.
 */
export class CommandHandler{

  /**
   * The directory of the commands.
   */
  public readonly dir: string;

  /**
   * Creates a new instance of the command handler.
   * @param dir The directory of the commands.
   */
  public constructor(dir: string){
    this.dir = dir;
  }

  /**
   * Load the commands.
   * @returns The loaded commands.
   */
  public async load(){
    return (await loadFiles<typeof ChatCommand>(this.dir)).map((x) => x.default ?? x);
  }

}