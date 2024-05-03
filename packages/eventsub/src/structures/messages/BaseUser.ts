import { Base } from './Base';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../types';

/**
 * The base class representing an user structure.
 */
export class BaseUser<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  /**
   * The ID of the user.
   */
  public readonly id: string;

  /**
   * The login name of the user.
   */
  public readonly login: string;

  /**
   * The display name of the user.
   */
  public readonly displayName: string;

  /**
   * Builds up a BaseUser.
   * @param connection The EventSub connection used.
   * @param subscription The subscription which trigger this message.
   * @param data The event data received with the subscription.
   */
  public constructor(connection: K, subscription: SubscriptionType<T, K>, data: BaseUserData){

    super(connection, subscription);

    this.id = data.id;

    this.login = data.login;

    this.displayName = data.display_name;

  }

}

/**
 * The data needed to build up a BaseUser.
 */
export interface BaseUserData {
  /**
   * The ID of the user.
   */
  id: string;
  /**
   * The login name of the user.
   */
  login: string;
  /**
   * The display name of the user.
   */
  display_name: string;
}