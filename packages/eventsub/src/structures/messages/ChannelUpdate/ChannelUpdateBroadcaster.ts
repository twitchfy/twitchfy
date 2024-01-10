import { BaseBroadcaster } from '../BaseBroadcaster';
import { EventSubConnection } from '../../EventSubConnection';
import { Subscription } from '../../Subscription';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';


export class ChannelUpdateBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelUpdate>{

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelUpdate>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);


  }

}