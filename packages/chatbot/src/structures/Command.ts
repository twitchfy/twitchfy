/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CommandContext } from './CommandContext';
import type { OptionsRecord, PermissionOrArray, RequiredPerms } from '../types';
import type { EventSubConnection } from '../enums';

/**
 * The command structure.
 */
export class Command<T extends EventSubConnection = EventSubConnection> {

  /**
   * The name of the command.
   */
  public readonly name: string;

  /**
   * The options of the command.
   */
  public readonly options: OptionsRecord; 

  /**
   * The permissions of the command.
   */
  public readonly permissions: PermissionOrArray<T>[];

  /**
   * The run function of the command.
   */
  run?(ctx: CommandContext<typeof this.options, T>): any;

  /**
   * The fallback function of the command if the permissions aren't satisfied.
   */
  onPermissionFallback?(ctx: CommandContext<typeof this.options, T>, permissions: RequiredPerms): any;

}