/* eslint-disable @typescript-eslint/ban-ts-comment */

import { validatePermission } from './validatePermission';
import { BasePermission } from '../structures';
import type { CommandContext } from '../structures';
import type { PermissionOrArray, PermissionRecord, RequiredPerms } from '../types';
import type { EventSubConnection } from '../enums';

/**
 * The result of the permission check.
 */
export interface PermissionCheckResult {
    passed: boolean;
    requiredPerms: RequiredPerms;
}


/**
 * Resolve the permissions of the command.
 * @param permissions The permissions to resolve.
 * @param ctx The context of the command.
 * @returns The result of the permission check.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export async function resolvePermissions<T extends EventSubConnection>(permissions: PermissionOrArray<T>[], ctx: CommandContext<{}, T>) {

  const requiredPerms: RequiredPerms = [];

  for (const permission of permissions){

    if(typeof permission === 'object'){

      assertPermissionToObj<T>(permission);      

      for(const permissionRecord of Object.entries(permission)){

        let validateAny = false;

        for(const perm of permissionRecord[1]){
          if(validateAny) break;
          if(await validatePermission(perm, ctx)) validateAny = true;
        }

        // @ts-expect-error
        const value = permissionRecord[0].prototype instanceof BasePermission ? new permissionRecord[0]().value : permissionRecord[0];


        if(!validateAny) requiredPerms.push(value);
      }
    }else{

      // @ts-expect-error
      const value = permission.prototype instanceof BasePermission ? new permission().value : permission;

      if(!await validatePermission(permission, ctx)) requiredPerms.push(value);
    }
  }

  return {
    passed: requiredPerms.length === 0,
    requiredPerms
  };
}

function assertPermissionToObj<T extends EventSubConnection>(permission: PermissionOrArray<T>): asserts permission is PermissionRecord<T> {}