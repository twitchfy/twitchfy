import type { RefreshTokenResponse, TokenCodeFlowResponse } from '@twitchapi/api-types';
import type { BaseClient } from './BaseClient';
import type { TokenAdapter } from './structures';
import { TwitchHelixError } from './structures/TwitchHelixError';
import type { GetResponses, PostResponses, PatchResponses, PutResponses, RequestOptions, PostBody, PatchBody, PutBody} from './types';
import type { Error } from './interfaces';




export class RequestManager {

  public client: BaseClient;
  public baseURL: string;

  public constructor(client: BaseClient) {

    this.client = client;
    this.baseURL = client.proxy ?? 'https://api.twitch.tv/helix';
  }


  public async get(endpoint: string, params: string, requestOptions: RequestOptions) : GetResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'GET', headers: this.makeHeaders(requestOptions) });

    if(!res.ok){

      if(requestOptions?.useTokenType === 'user'){

        const token = this.getToken(requestOptions) as TokenAdapter;

        if(token.type === 'implicit' || !token.refresh ) throw new TwitchHelixError(res, await res.json() as Error, 'GET');

        await this.handleTokenAdapterRefresh(token as TokenAdapter<'code', true>);

        return this.get(endpoint, params, requestOptions);
        
      }

      throw new TwitchHelixError(res, await res.json() as Error, 'GET');

    }

    return await res.json();
  }

  public async delete(endpoint: string, params: string, requestOptions: RequestOptions) {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders(requestOptions) });

    if(!res.ok){

      if(requestOptions?.useTokenType === 'user'){

        const token = this.getToken(requestOptions) as TokenAdapter;

        if(token.type === 'implicit' || !token.refresh) throw new TwitchHelixError(res, await res.json() as Error, 'DELETE');

        await this.handleTokenAdapterRefresh(token as TokenAdapter<'code', true>);

        this.delete(endpoint, params, requestOptions);
        
      }

      throw new TwitchHelixError(res, await res.json() as Error, 'DELETE');

    }
  
  }

  public async post(endpoint: string, params: string, body: PostBody, requestOptions: RequestOptions): PostResponses {
    
    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'POST', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body) });
        
    if(!res.ok){

      if(requestOptions?.useTokenType === 'user'){

        const token = this.getToken(requestOptions) as TokenAdapter;

        if(token.type === 'implicit' || !token.refresh) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

        await this.handleTokenAdapterRefresh(token as TokenAdapter<'code', true>);

        return this.post(endpoint, params, body, requestOptions);
        
      }

      throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    }

    if(res.status === 204) return;

    return await res.json();
  }

  public async patch(endpoint: string, params: string, body: PatchBody, requestOptions: RequestOptions): PatchResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PATCH', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body)});

    if(!res.ok){

      if(requestOptions?.useTokenType === 'user'){

        const token = this.getToken(requestOptions) as TokenAdapter;

        if(token.type === 'implicit' || !token.refresh) throw new TwitchHelixError(res, await res.json() as Error, 'PATCH');

        await this.handleTokenAdapterRefresh(token as TokenAdapter<'code', true>);

        return this.patch(endpoint, params, body, requestOptions);
        
      }

      throw new TwitchHelixError(res, await res.json() as Error, 'PATCH');

    }

    return await res.json();
  }

  public async put(endpoint: string, params: string, body: PutBody, requestOptions: RequestOptions) : PutResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PUT', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body)});

    if(!res.ok){

      if(requestOptions?.useTokenType === 'user'){

        const token = this.getToken(requestOptions) as TokenAdapter;

        if(token.type === 'implicit' || !token.refresh) throw new TwitchHelixError(res, await res.json() as Error, 'PUT');

        await this.handleTokenAdapterRefresh(token as TokenAdapter<'code', true>);

        return this.put(endpoint, params, body, requestOptions);
        
      }

      throw new TwitchHelixError(res, await res.json() as Error, 'PUT');

    }

    if(res.status === 204) return;

    return await res.json();
  }

  public async validateToken(requestOptions: RequestOptions, noError: boolean = true){

    const res = await fetch(this.baseURL + '/oauth2/validate', { headers: this.makeHeaders(requestOptions) } );

    if(!res.ok){

      switch(noError){

      case true : return false;

        break;

      case false : throw new TwitchHelixError(res, await res.json() as Error, 'GET');

      }

    }

    return true;
  }

  public async refreshToken(refreshToken: string){

    const res = await fetch(`https://id.twitch.tv/oauth2/token?${new URLSearchParams({ client_id: this.client.clientId, client_secret: this.client.clientSecret, grant_type: 'refresh_token', refresh_token: refreshToken }).toString()}`, { method: 'POST' });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    return await res.json() as RefreshTokenResponse;

  }

  public async generateUserToken(code: string, redirectURI: string){

    const res = await fetch(`https://id.twitch.tv/oauth2/token?${new URLSearchParams({ client_id: this.client.clientId, client_secret: this.client.clientSecret, code, grant_type: 'authorization_code', redirect_uri: redirectURI }).toString()}`, { method: 'POST' });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    return await res.json() as TokenCodeFlowResponse;

  }

  private makeHeaders(requestOptions: RequestOptions) {

    const token = this.getToken(requestOptions);

    return { 'Authorization': `Bearer ${token.token}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };
    
  }

  private getToken(requestOptions: RequestOptions){

    let token : TokenAdapter;
    
    switch(requestOptions?.useTokenType){
      
    case 'app' : token = this.client.appToken;

      break;

    case 'user': {

      setRequestOptionsType<'user'>(requestOptions);

      token = requestOptions.userToken || this.client.userToken;

    }

      break;

    default: token = this.client.preferedToken === 'app' ? this.client.appToken : this.client.userToken;

      break;

    }

    return token;
  }

  private async handleTokenAdapterRefresh(token: TokenAdapter<'code', true>){
          
    const data = await this.refreshToken(token.refreshToken);

    token.token = data.access_token;

    token.refreshToken = data.refresh_token;


  }
}

function setRequestOptionsType<T extends 'app' | 'user'>(requestOptions: RequestOptions): asserts requestOptions is RequestOptions<T> {}