import { Base } from '../Base';
import { Subscription } from '../../Subscription';
import { EventSubConnection } from '../../EventSubConnection';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';

export class ChannelUpdateCategory extends Base<SubscriptionTypes.ChannelUpdate> {
    
  public id: string;

  public name: string;

  public constructor(connection: EventSubConnection, subscription: Subscription<SubscriptionTypes.ChannelUpdate>, id: string, name: string){

    super(connection, subscription);

    this.id = id;

    this.name = name;

  }
}