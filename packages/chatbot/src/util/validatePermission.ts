/* eslint-disable @typescript-eslint/ban-ts-comment */

import { BasePermission } from '../structures';
import type { CommandContext } from '../structures';
import { Permission } from '../enums';
import type { EventSubConnection } from '../enums';

/**
 * Validate the permission of the user.
 * @param permission The permission to validate.
 * @param ctx The context of the command.
 * @returns Whether the user has passed the permission.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export async function validatePermission<T extends EventSubConnection>(permission: typeof BasePermission<T> | Permission, ctx: CommandContext<{}, T>){
  const badges = ctx.author.badges;

  if(badges.has('broadcaster')) return true;

  // @ts-expect-error
  if(permission.prototype instanceof BasePermission){

    // @ts-expect-error
    const instance = new permission();
    return instance.check(ctx);

  } 

  switch(permission){

  case Permission.Moderator: return badges.has('moderator');
  
  case Permission.Vip: return badges.has('vip') || badges.has('moderator');
  
  case Permission.Subscriber: return badges.has('subscriber');
  
  case Permission.SubscriberTier1: return badges.has('subscriber') && badges.get('subscriber')!.id[0] === '1';
  
  case Permission.SubscriberTier2: return badges.has('subscriber') && badges.get('subscriber')!.id[0] === '2';
  
  case Permission.SubscriberTier3: return badges.has('subscriber') && badges.get('subscriber')!.id[0] === '3';
  
  default: return false;
  }
}
