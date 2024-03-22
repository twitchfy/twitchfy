import { BaseUser } from '../BaseUser';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

export class ChannelFollowUser<K extends ConnectionTypes = ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelFollow, K>{

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelFollow, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}