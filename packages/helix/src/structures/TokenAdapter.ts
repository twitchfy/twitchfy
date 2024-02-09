import type { TokenTypes, TokenAdapterOptions } from '../types';

export class TokenAdapter<T extends TokenTypes = TokenTypes, K extends boolean = true > {

  public type: T;

  public token: string;

  public refreshToken: K extends true ? string : never;

  public refresh: T extends 'code' ? K : never;

  public constructor(options: TokenAdapterOptions<T, K>){

    this.type = options.type;

    this.token = options.token;

    this.refreshToken = 'refreshToken' in options ? options.refreshToken as never : undefined as never;

    this.refresh = options.type === 'code' ? 'refresh' in options ? options.refresh as never : true as never : undefined as never;

  }
}