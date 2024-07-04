import type { TokenTypes, TokenAdapterOptions } from '../types';

export class TokenAdapter<T extends TokenTypes = TokenTypes, K extends boolean = (T extends 'code' | 'app'  | 'device' ? true : never)>{

  public readonly type: T;

  public token: string;

  public refreshToken: T extends 'code' | 'device' ? K extends true? string : never : never;

  public readonly refresh: T extends 'code' | 'app' | 'device' ? K : never;

  public constructor(options: TokenAdapterOptions<T, K>){

    this.type = options.type;

    this.token = options.token;

    this.refreshToken = 'refreshToken' in options ? options.refreshToken as never : undefined as never;

    this.refresh = ['app', 'code', 'device'].includes(options.type) ? 'refresh' in options ? options.refresh as never : true as never : undefined as never;

  }

  public setToken(token: string){
    
    this.token = token;

    return this;
  }

  public setRefreshToken(refreshToken: string){

    this.refreshToken = refreshToken as T extends 'code' | 'device' ? K extends true? string : never : never;

    return this;
  }

  public isUserToken(){
    return (this.type === 'code' || this.type === 'implicit' || this.type === 'device'); 
  }

  public isAppToken(){
    return this.type === 'app';
  }
}