import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';
import type { StreamOfflineEvent } from '../../../interfaces';
import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';

/**
 * The message received by the StreamOffline event.
 */

export class StreamOfflineMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.StreamOffline, K> {
    
  /**
   * The broadcaster of the stream which went offline.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.StreamOffline, K>;

  /**
   * Builds up a StreamOffline message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.StreamOffline, K>, data: StreamOfflineEvent) {
    super(connection, subscription);
    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });
  }
}