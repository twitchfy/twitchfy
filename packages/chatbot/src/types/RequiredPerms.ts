import type { Permission } from '../enums';

/**
 * The required permissions for the command returned on the onPermissionsFallback function.
 */
export type RequiredPerms = (Permission | string)[]