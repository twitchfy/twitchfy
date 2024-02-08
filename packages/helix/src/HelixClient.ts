import { BaseClient } from './BaseClient';
import type { HelixClientOptions } from './interfaces';


export class HelixClient extends BaseClient implements HelixClientOptions{

  public constructor(options: HelixClientOptions){

    super(options);
 
  }
}