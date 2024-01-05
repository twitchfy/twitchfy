import { BaseClient } from './BaseClient';
import { HelixClientOptions } from './interfaces/HelixClientOptions';


export class HelixClient extends BaseClient implements HelixClientOptions{

  public constructor(options: HelixClientOptions){

    super(options);
 
  }




}