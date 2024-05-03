import { BaseSubscriptionMessage } from '../BaseSubscriptionMessage';
import { BaseUser } from '../BaseUser';
import type { ChannelAdBreakBeginEvent } from '../../../interfaces';
import type { SubscriptionTypes } from '../../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../../types';

/**
 * The message received by the ChannelAdBreakBegin event.
 */
export class ChannelAdBreakBeginMessage<K extends ConnectionTypes = ConnectionTypes> extends BaseSubscriptionMessage<SubscriptionTypes.ChannelAdBreakBegin, K>{
   

  /**
   * The broadcaster of the channel where the ad was begun.
   */
  public readonly broadcaster: BaseUser<SubscriptionTypes.ChannelAdBreakBegin, K>; 
  /**
   * The user who requested the ad break. If the ad break was automatically triggered, this field is the broadcaster.
   */
  public readonly requester: BaseUser<SubscriptionTypes.ChannelAdBreakBegin, K>;
  /**
   * The duration in seconds of the ad break.
   */
  public readonly duration: number;
  /**
   * The Date object of when the ad break started.
   */
  public readonly startedAt: Date;
  /**
   * Whether the ad break was automatically triggered or was manually triggered by the broadcaster.
   */
  public readonly isAutomatic: boolean;

  /**
   * Builds up a ChannelAdBreakBegin message.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<SubscriptionTypes.ChannelAdBreakBegin, K>, data: ChannelAdBreakBeginEvent){

    super(connection, subscription);

    this.broadcaster = new BaseUser(connection, subscription, { id: data.broadcaster_user_id, login: data.broadcaster_user_login, display_name: data.broadcaster_user_name });

    this.requester = new BaseUser(connection, subscription, { id: data.requester_user_id, login: data.requester_user_login, display_name: data.requester_user_name });  
    this.duration = Number(data.duration_seconds);

    this.startedAt = new Date(data.started_at);

    this.isAutomatic = data.is_automatic;

  }

}