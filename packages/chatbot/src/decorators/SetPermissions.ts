import type { Command } from '../structures';
import { Permission, type EventSubConnection } from '../enums';
import type { PermissionOrArray } from '../types';

/**
 * Set the permissions for the command.
 * @param permission The permissions to set for the command. 
 * @returns The decorator function.
 */
export function SetPermissions<T extends EventSubConnection = EventSubConnection>(...permission: (PermissionOrArray<T>)[]){
  return function (constructor: new () => Command<T>){
    constructor.prototype.permissions = permission;
  };
}

SetPermissions(Permission.Broadcaster, { moderator: [Permission.Moderator, Permission.SubscriberTier1 ]});