import { ChannelUpdateBroadcaster } from './ChannelUpdateBroadcaster';
import { ChannelUpdateCategory } from './ChannelUpdateCategory';
import { Base } from '../Base';
import { SubscriptionTypes } from '../../../enums/SubscriptionTypes';
import { Subscription } from '../../../structures/Subscription';
import { ChannelUpdateEvent } from '../../../interfaces/messages/Notification/events/ChannelUpdate/ChannelUpdateEvent';
import { ConnectionTypes } from '../../../types/ConnectionTypes';


export class ChannelUpdateMessage<K extends ConnectionTypes = ConnectionTypes> extends Base<SubscriptionTypes.ChannelUpdate, K>{

  public broadcaster: ChannelUpdateBroadcaster<K>;

  public title: string;

  public language: string;

  public category: ChannelUpdateCategory<K>;

  public labels: string;

  public constructor(connection: K, subscription: Subscription<SubscriptionTypes.ChannelUpdate, K>, data: ChannelUpdateEvent){

    super(connection, subscription);

    this.broadcaster = new ChannelUpdateBroadcaster(connection, subscription, data.broadcaster_user_id, data.broadcaster_user_login, data.broadcaster_user_name);

    this.title = data.title;

    this.language = data.language;

    this.category = new ChannelUpdateCategory(connection, subscription, data.category_id, data.category_name);

    this.labels = data.content_classification_labels;

  }

}