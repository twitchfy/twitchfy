import { Base } from './Base';
import { Subscription } from '../Subscription';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';
import { ConnectionTypes } from '../../types/ConnectionTypes';

export class BaseRequester<T extends SubscriptionTypes, K extends ConnectionTypes = ConnectionTypes> extends Base<T, K> {

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