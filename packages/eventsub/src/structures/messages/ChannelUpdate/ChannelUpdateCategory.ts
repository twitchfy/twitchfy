import { Base, Subscription } from '../..';
import { SubscriptionTypes } from '../../../enums/';
import { ConnectionTypes } from '../../../types/';

export class ChannelUpdateCategory<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelUpdate, K> {
    
  public id: string;

  public name: string;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelUpdate, K>, id: string, name: string){

    super(connection, subscription);

    this.id = id;

    this.name = name;

  }
}