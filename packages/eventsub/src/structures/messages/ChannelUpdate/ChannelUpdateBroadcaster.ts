import { BaseBroadcaster, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums';
import { ConnectionTypes } from '../../../types';


export class ChannelUpdateBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelUpdate, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelUpdate, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);


  }

}