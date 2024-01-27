import { BaseBroadcaster } from '../BaseBroadcaster';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../../types/ConnectionTypes';


export class ChannelUpdateBroadcaster<K extends ConnectionTypes = ConnectionTypes> extends BaseBroadcaster<SubscriptionTypes.ChannelUpdate, K>{

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelUpdate, K>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);


  }

}