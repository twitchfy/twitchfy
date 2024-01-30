import { BaseBroadcaster } from '../BaseBroadcaster';
import type { Subscription } from '../../Subscription';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes } from '../../../types';


export class ChannelFollowBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelFollow, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelFollow, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}