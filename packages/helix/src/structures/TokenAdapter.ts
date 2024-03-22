import type { TokenTypes, TokenAdapterOptions } from '../types';

export class TokenAdapter<T extends TokenTypes = TokenTypes, K extends boolean = (T extends 'code' | 'app' ? true : never)>{

  public type: T;

  public token: string;

  public refreshToken: T extends 'code' ? K extends true? string : never : never;

  public refresh: T extends 'code' | 'app' ? K : never;

  public constructor(options: TokenAdapterOptions<T, K>){

    this.type = options.type;

    this.token = options.token;

    this.refreshToken = 'refreshToken' in options ? options.refreshToken as never : undefined as never;

    this.refresh = options.type === 'code' || options.type === 'app' ? 'refresh' in options ? options.refresh as never : true as never : undefined as never;

  }

  public setToken(token: string){
    
    this.token = token;

    return this;
  }

  public setRefreshToken(refreshToken: string){

    this.refreshToken = refreshToken as T extends 'code' ? K extends true? string : never : never;

    return this;
  }

  public isUserToken(){
    return (this.type === 'code' || this.type === 'implicit'); 
  }

  public isAppToken(){
    return this.type === 'app';
  }
}