import type { RefreshTokenResponse, StartDCFResponse, TokenClientCredentialsFlowResponse, TokenCodeFlowResponse, TokenDeviceFlowResponse, ValidateTokenResponse } from '@twitchfy/api-types';
import type { BaseClient } from './BaseClient';
import { TokenAdapter } from './structures';
import { TwitchHelixError } from './structures/TwitchHelixError';
import type { GetResponses, PostResponses, PatchResponses, PutResponses, RequestOptions, PostBody, PatchBody, PutBody, TokenTypes, PickRequired, GenerateUserTokenOptions } from './types';
import type { Error, GenerateAppTokenOptions, InitDeviceFlowOptions } from './interfaces';
import { parseScopes } from './utils';




export class RequestManager {

  public client: BaseClient;
  public baseURL: string;
  public authURL: string;

  public constructor(client: BaseClient) {

    this.client = client;
    this.baseURL = client.proxy ?? 'https://api.twitch.tv/helix';
    this.authURL = 'https://id.twitch.tv';
  }


  public async get(endpoint: string, params: string, requestOptions: RequestOptions): Promise<GetResponses> {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'GET', headers: this.makeHeaders(requestOptions) });

    if (!res.ok) {

      const token = this.getToken(requestOptions);

      if (token?.type === 'implicit' || !token?.refresh || requestOptions?.refreshToken === false || await this.validateToken(requestOptions)) throw new TwitchHelixError(res, await res.json() as Error, 'GET');

      const refreshedToken = await this.handleTokenAdapterRefresh(token as TokenAdapter<'code' | 'app', true>);

      this.setProperToken(token as TokenAdapter<TokenTypes, true>, refreshedToken, requestOptions);

      return await this.get(endpoint, params, { ...requestOptions, refreshToken: false });


    }

    return await res.json();
  }

  public async delete(endpoint: string, params: string, requestOptions: RequestOptions) {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders(requestOptions) });

    if (!res.ok) {

      const token = this.getToken(requestOptions) as TokenAdapter;

      if (token?.type === 'implicit' || !token?.refresh || requestOptions?.refreshToken === false || await this.validateToken(requestOptions)) throw new TwitchHelixError(res, await res.json() as Error, 'DELETE');

      const refreshedToken = await this.handleTokenAdapterRefresh(token as TokenAdapter<'code' | 'app', true>);

      this.setProperToken(token as TokenAdapter<TokenTypes, true>, refreshedToken, requestOptions);

      await this.delete(endpoint, params, { ...requestOptions, refreshToken: false });


    }

  }

  public async post(endpoint: string, params: string, body: PostBody, requestOptions: RequestOptions): Promise<PostResponses> {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'POST', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body) });

    if (!res.ok) {

      const token = this.getToken(requestOptions) as TokenAdapter;

      if (token?.type === 'implicit' || !token?.refresh || requestOptions?.refreshToken === false || await this.validateToken(requestOptions)) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

      const refreshedToken = await this.handleTokenAdapterRefresh(token as TokenAdapter<'code' | 'app', true>);

      this.setProperToken(token as TokenAdapter<TokenTypes, true>, refreshedToken, requestOptions);

      return await this.post(endpoint, params, body, { ...requestOptions, refreshToken: false });

    }

    if (res.status === 204) return;

    return await res.json();
  }

  public async patch(endpoint: string, params: string, body: PatchBody, requestOptions: RequestOptions): Promise<PatchResponses> {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PATCH', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body) });

    if (!res.ok) {


      const token = this.getToken(requestOptions) as TokenAdapter;

      if (token?.type === 'implicit' || !token?.refresh || requestOptions?.refreshToken === false || await this.validateToken(requestOptions)) throw new TwitchHelixError(res, await res.json() as Error, 'PATCH');

      const refreshedToken = await this.handleTokenAdapterRefresh(token as TokenAdapter<'code' | 'app', true>);

      this.setProperToken(token as TokenAdapter<TokenTypes, true>, refreshedToken, requestOptions);

      return await this.patch(endpoint, params, body, { ...requestOptions, refreshToken: false });


    }

    return await res.json();
  }

  public async put(endpoint: string, params: string, body: PutBody, requestOptions: RequestOptions): Promise<PutResponses> {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PUT', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body) });

    if (!res.ok) {

      const token = this.getToken(requestOptions) as TokenAdapter;

      if (token?.type === 'implicit' || !token?.refresh || requestOptions?.refreshToken === false || await this.validateToken(requestOptions)) throw new TwitchHelixError(res, await res.json() as Error, 'PUT');

      const refreshedToken = await this.handleTokenAdapterRefresh(token as TokenAdapter<'code' | 'app', true>);

      this.setProperToken(token as TokenAdapter<TokenTypes, true>, refreshedToken, requestOptions);

      return await this.put(endpoint, params, body, { ...requestOptions, refreshToken: false });


    }

    if (res.status === 204) return;

    return await res.json();
  }

  public async validateToken<T extends boolean = false>(requestOptions?: RequestOptions, showInfo: T = false as T, noError: boolean = true): Promise<T extends true ? ValidateTokenResponse : boolean> {

    const res = await fetch(this.authURL + '/oauth2/validate', { headers: this.makeHeaders(requestOptions) });

    if (!res.ok) {

      switch (noError) {

      case true: return false as T extends true ? ValidateTokenResponse : boolean;

        break;

      case false: throw new TwitchHelixError(res, await res.json() as Error, 'GET');

      }

    }

    return (showInfo ? await res.json() as ValidateTokenResponse : true) as T extends true ? ValidateTokenResponse : boolean;
  }


  public async refreshToken(refreshToken: string) {

    const res = await fetch(this.authURL + `/oauth2/token?${new URLSearchParams({ client_id: this.client.clientId, client_secret: this.client.clientSecret, grant_type: 'refresh_token', refresh_token: refreshToken }).toString()}`, { method: 'POST' });

    if (!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    return await res.json() as RefreshTokenResponse;

  }

  public static async generateAppToken(options: PickRequired<GenerateAppTokenOptions, 'clientId' | 'clientSecret'>) {

    const res = await fetch(`https://id.twitch.tv/oauth2/token?${new URLSearchParams({ client_id: options?.clientId, client_secret: options?.clientSecret, grant_type: 'client_credentials' }).toString()}`, { method: 'POST' });

    if (!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    return await res.json() as TokenClientCredentialsFlowResponse;
  }

  public static async generateUserToken(options: GenerateUserTokenOptions & { clientId: string }) {

    switch (options.flow) {

    case 'code': {

      const res = await fetch(`https://id.twitch.tv/oauth2/token?${new URLSearchParams({ client_id: options.clientId, client_secret: options.clientSecret, grant_type: 'authorization_code', redirect_uri: options.redirectURI, code: options.code }).toString()}`, { method: 'POST' });

      if (!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

      return await res.json() as TokenCodeFlowResponse;

    }

      break;

    case 'device' : {
        
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const res = await fetch(`https://id.twitch.tv/oauth2/token?${new URLSearchParams({ client_id: options.clientId, client_secret: options.clientSecret, grant_type: 'urn:ietf:params:oauth:grant-type:device_code', device_code: options.deviceCode, scopes: parseScopes(options.scopes) }).toString()}`, { method: 'POST' });
  
      if (!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');
  
      return await res.json() as TokenDeviceFlowResponse;
    }

    }
  } 

  public static async initDeviceFlow(options: PickRequired<InitDeviceFlowOptions, 'clientId'>){

    const res = await fetch(`https://id.twitch.tv/oauth2/device?${new URLSearchParams({ client_id: options.clientId, scopes: parseScopes(options.scopes) }).toString()}`, { method: 'POST' });
  
    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error, 'POST');

    return await res.json() as StartDCFResponse;

  }

  private makeHeaders(requestOptions: RequestOptions) {

    const token = this.getToken(requestOptions);

    const headers = { 'Authorization': `Bearer ${token?.token}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };

    return headers;

  }

  private getToken(requestOptions: RequestOptions) {

    let token: TokenAdapter<TokenTypes, boolean>;

    switch (requestOptions?.useTokenType) {

    case 'app': token = this.client.appToken;

      break;

    case 'user': {

      setRequestOptionsType<'user'>(requestOptions);

      token = requestOptions.userToken || this.client.userToken;

    }

      break;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    default: token = requestOptions?.userToken ?? this.client.preferedToken === 'app' ? this.client.appToken ?? this.client.userToken : this.client.userToken ?? this.client.appToken;

      break;

    }

    return token;
  }

  private async handleTokenAdapterRefresh(token: TokenAdapter<'code' | 'app', true>) {

    if (token.type === 'app') {

      setTokenType<'app', true>(token);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error

      const data = await RequestManager.generateAppToken({ ...this.client, raw: true });

      const newToken = new TokenAdapter(token).setToken(data.access_token);

      const onAppTokenRefresh = this.client.callbacks.onAppTokenRefresh;

      if (onAppTokenRefresh) onAppTokenRefresh(token, newToken);

      return newToken;

    } else {

      setTokenType<'code', true>(token);

      const data = await this.refreshToken(token.refreshToken);

      const newToken = new TokenAdapter(token).setToken(data.access_token).setRefreshToken(data.refresh_token);

      const onUserTokenRefresh = this.client.callbacks.onUserTokenRefresh;

      if (onUserTokenRefresh) onUserTokenRefresh(token, newToken);

      return newToken;

    }
  }

  private setProperToken(oldToken: TokenAdapter<TokenTypes, true>, newToken: TokenAdapter<TokenTypes, true>, requestOptions: RequestOptions) {

    if (oldToken.isUserToken()) {

      if ((requestOptions as RequestOptions<'user'>)?.userToken) {
        requestOptions = { ...requestOptions, userToken: newToken as TokenAdapter<'code', true> };
      } else this.client.setUserToken(newToken as TokenAdapter<'code', true>);

    } else this.client.setAppToken(newToken as TokenAdapter<'app', true>);
  }
}

function setRequestOptionsType<T extends 'app' | 'user'>(requestOptions: RequestOptions): asserts requestOptions is RequestOptions<T> { }

function setTokenType<T extends TokenTypes = TokenTypes, K extends boolean = true>(token: TokenAdapter<TokenTypes, boolean>): asserts token is TokenAdapter<T, K> { }