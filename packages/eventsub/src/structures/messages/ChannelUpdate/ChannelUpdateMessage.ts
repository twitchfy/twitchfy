import { BaseUser } from '../BaseUser';
import { ChannelUpdateCategory } from './ChannelUpdateCategory';
import { Base } from '../Base';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelUpdateEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


export class ChannelUpdateMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelUpdate, K>{

  public broadcaster: BaseUser<SubscriptionTypes.ChannelUpdate, K>;

  public title: string;

  public language: string;

  public category: ChannelUpdateCategory<K>;

  public labels: string[];

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelUpdate, K>, data: ChannelUpdateEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.title = data.title;

    this.language = data.language;

    this.category = new ChannelUpdateCategory(connection, subscription, data.category_id, data.category_name);

    this.labels = data.content_classification_labels;

  }

}