import { Base } from './Base';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../types';

export class BaseUser<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;

  public login: string;

  public displayName: string;

  public constructor(connection: K, subscription: SubscriptionType<T, K>, data: BaseUserData){

    super(connection, subscription);

    this.id = data.id;

    this.login = data.login;

    this.displayName = data.display_name;

  }

}

export interface BaseUserData {
  id: string;
  login: string;
  display_name: string;
}