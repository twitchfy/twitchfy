import { Base } from '../Base';
import type { SubscriptionTypes } from '../../../enums/';
import type { ConnectionTypes, SubscriptionType } from '../../../types/';

export class ChannelUpdateCategory<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelUpdate, K> {
    
  public id: string;

  public name: string;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelUpdate, K>, id: string, name: string){

    super(connection, subscription);

    this.id = id;

    this.name = name;

  }
}