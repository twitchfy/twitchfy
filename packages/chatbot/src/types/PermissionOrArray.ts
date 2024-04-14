import type { BasePermission } from '../structures';
import type { EventSubConnection, Permission } from '../enums';

/**
 * The permissions object of the command.
 */
export type PermissionRecord<T extends EventSubConnection> = Record<string, (Permission | typeof BasePermission<T>)[]>

/**
 * The permissions of the command.
 */
export type PermissionOrArray<T extends EventSubConnection> = Permission | PermissionRecord<T> | typeof BasePermission<T>;
