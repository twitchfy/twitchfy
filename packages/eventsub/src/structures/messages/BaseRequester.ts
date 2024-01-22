import { Base } from './Base';
import { Subscription } from '../Subscription';
import { EventSubConnection } from '../EventSubConnection';
import { SubscriptionTypes } from '../../enums/SubscriptionTypes';

export class BaseRequester<T extends SubscriptionTypes> extends Base<T> {

  public id: string;
  
  public login: string;
  
  public displayName: string;
  
  public constructor(connection: EventSubConnection, subscription: Subscription<T>, id: string, login: string, displayName: string){
  
    super(connection, subscription);
  
    this.id = id;
  
    this.login = login;
  
    this.displayName = displayName;
  
  }
  
}