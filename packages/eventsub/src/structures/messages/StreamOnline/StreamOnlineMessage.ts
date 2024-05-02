import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import { BaseStream } from '../BaseStream';
import type { SubscriptionTypes } from '../../../enums';
import type { StreamOnlineEvent } from '../../../interfaces';
import type { ConnectionTypes, SubscriptionType } from '../../../types';


export class StreamOnlineMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.StreamOnline, K>{

  public broadcaster: BaseUser<SubscriptionTypes.StreamOnline, K>;
  public stream: BaseStream<SubscriptionTypes.StreamOnline, K>;

  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.StreamOnline, K>, data: StreamOnlineEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.stream = new BaseStream(connection, subscription, data);

  }

}