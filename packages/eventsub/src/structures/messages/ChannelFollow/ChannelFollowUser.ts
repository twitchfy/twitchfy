import { BaseUser } from '../BaseUser';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../../types/ConnectionTypes';

export class ChannelFollowUser<K extends ConnectionTypes = ConnectionTypes> extends BaseUser<SubscriptionTypes.ChannelFollow, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelFollow, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}