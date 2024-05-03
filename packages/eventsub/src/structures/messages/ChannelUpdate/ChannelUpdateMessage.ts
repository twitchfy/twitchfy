import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import { ChannelUpdateCategory } from './ChannelUpdateCategory';
import type { SubscriptionTypes } from '../../../enums';
import type { ChannelUpdateEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


/**
 * The message received by the ChannelUpdate event.
 */
export class ChannelUpdateMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelUpdate, K>{

  /**
   * The broadcaster of the channel which was updated.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelUpdate, K>;

  /**
   * The title of the channel after it was updated.
   */
  public readonly title: string;

  /**
   * The language of the channel after it was updated.
   */
  public readonly language: string;

  /**
   * The category of the channel after it was updated.
   */
  public readonly category: ChannelUpdateCategory<K>;

  /**
   * The content classification labels of the channel after it was updated.
   */
  public readonly labels: string[];

  /**
   * Builds up a ChannelUpdate message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelUpdate, K>, data: ChannelUpdateEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.title = data.title;

    this.language = data.language;

    this.category = new ChannelUpdateCategory(connection, subscription, data.category_id, data.category_name);

    this.labels = data.content_classification_labels;

  }

}