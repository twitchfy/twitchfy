import type { BaseUserData } from '../BaseUser';
import { BaseUser } from '../BaseUser';
import { Badge } from '../Badge';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { SubscriptionTypes } from '../../../enums';
import type { BadgeData } from '../../../interfaces';

export class ChannelChatMessageChatter<K extends ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelChatMessage, K> {

  public badges: Badge[];

  public color: string;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelChatMessage, K>, data: BaseUserData & { badges: BadgeData[], color: string }){
    super(connection, subscription, data);

    this.badges = data.badges.map(badge => new Badge(badge));

    this.color = data.color;
  }
}