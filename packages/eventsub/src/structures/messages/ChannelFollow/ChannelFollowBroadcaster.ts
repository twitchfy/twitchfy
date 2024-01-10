import { BaseBroadcaster } from '../BaseBroadcaster';
import { Subscription } from '../../Subscription';
import { EventSubConnection } from '../../EventSubConnection';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';


export class ChannelFollowBroadcaster extends BaseBroadcaster<SubscriptionTypes.ChannelFollow>{

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelFollow>, id: string, login: string, displayName: string){

    super(connection, subscription, id, login, displayName);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}