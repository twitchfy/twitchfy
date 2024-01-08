import { BaseBroadcaster } from '../BaseBroadcaster';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';


export class StreamOnlineBroadcaster extends BaseBroadcaster<SubscriptionTypes.StreamOnline>{

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.StreamOnline>, id: string, login: string, displayName: string){
        
    super(connection, subscription, id, login, displayName);
  }

}