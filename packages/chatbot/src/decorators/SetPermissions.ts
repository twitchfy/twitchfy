import type { ChatCommand } from '../structures';
import { type EventSubConnection } from '../enums';
import type { DefaultConnection, PermissionOrArray } from '../types';

/**
 * Set the permissions for the command.
 * @param permission The permissions to set for the command. 
 * @returns The decorator function.
 */
export function SetPermissions<T extends EventSubConnection = DefaultConnection>(...permission: (PermissionOrArray<T>)[]){
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  return <K extends { new (...args: any[]): ChatCommand<T> }>(target: K) =>
    class extends target {
      override permissions = permission;
    };
}