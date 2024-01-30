import { Base } from './Base';
import type { Subscription } from '../Subscription';
import type { SubscriptionTypes } from '../../enums';
import type { ConnectionTypes } from '../../types';

export class BaseBroadcaster<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

  public id: string;

  public login: string;

  public displayName: string;

  public constructor(connection: K, subscription: Subscription<T, K>, id: string, login: string, displayName: string){

    super(connection, subscription);

    this.id = id;

    this.login = login;

    this.displayName = displayName;

  }

}