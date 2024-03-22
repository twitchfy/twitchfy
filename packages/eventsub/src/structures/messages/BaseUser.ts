import { Base } from './Base';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes, SubscriptionType } from '../../types';

export class BaseUser<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;

  public login: string;

  public displayName: string;

  public constructor(connection: K, subscription: SubscriptionType<T, K>, id: string, login: string, displayName: string){

    super(connection, subscription);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}