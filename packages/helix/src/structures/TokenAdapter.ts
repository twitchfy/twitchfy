import type { TokenTypes, TokenAdapterOptions } from '../types';

export class TokenAdapter<T extends TokenTypes = TokenTypes> {

  public token: string;

  public refreshToken: T extends 'code' ? string : never;
    
  public type: T;

  public constructor(options: TokenAdapterOptions<T>){

    this.token = options.token;

    this.refreshToken = 'refreshToken' in options ? options.refreshToken as never : undefined as never;

    this.type = options.type;
  }
}