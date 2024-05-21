/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TwitchContext } from './TwitchContext';
import type { DefaultConnection, OptionsRecord, PermissionOrArray, RequiredPerms } from '../types';
import type { EventSubConnection } from '../enums';



/**
 * The command structure.
 */
export class ChatCommand<T extends EventSubConnection = DefaultConnection> {

  /**
   * The name of the command.
   */
  public readonly name?: string;

  /**
   * The options of the command.
   */
  public readonly options?: OptionsRecord; 

  /**
   * The permissions of the command.
   */
  public readonly permissions?: PermissionOrArray<T>[];

  /**
   * The run function of the command.
   */
  // @ts-expect-error
  run?(ctx: TwitchContext<typeof this.options, T>): any;

  /**
   * The fallback function of the command if the permissions aren't satisfied.
   */
  // @ts-expect-error
  onPermissionFallback?(ctx: TwitchContext<typeof this.options, T>, permissions: RequiredPerms): any;

}