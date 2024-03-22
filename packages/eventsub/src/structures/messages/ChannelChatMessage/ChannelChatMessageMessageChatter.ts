import { BaseUser } from '../BaseUser';
import { Badge } from '../Badge';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { BadgeData } from '../../../interfaces';
import type { SubscriptionTypes } from '../../../enums';

export class ChannelChatMessageMessageChatter<K extends ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatMessage, K> {

  public color: string;

  public badges: Badge[];

    
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, id: string, login: string, displayName: string, color: string, badges: BadgeData[]){
    super(connection, subscription, id, login, displayName);

    this.color = color;

    this.badges = badges.map((x) => new Badge(x));

  }
}