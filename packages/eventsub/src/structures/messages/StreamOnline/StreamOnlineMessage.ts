import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import { BaseStream } from '../BaseStream';
import type { SubscriptionTypes } from '../../../enums';
import type { StreamOnlineEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

/**
 * The message received by the StreamOnline event.
 */
export class StreamOnlineMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.StreamOnline, K>{

  /**
   * The broadcaster of the stream which went online.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.StreamOnline, K>;
  /**
   * The stream which went online.
   */
  public readonly stream: BaseStream<SubscriptionTypes.StreamOnline, K>;

  /**
   * Builds up a StreamOnline message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.StreamOnline, K>, data: StreamOnlineEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.stream = new BaseStream(connection, subscription, data);

  }

}