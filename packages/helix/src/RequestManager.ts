import fetch from 'node-fetch';
import type { BaseClient } from './BaseClient';
import type { WhisperBody } from './structures/WhisperBody';
import type { TimeoutBody } from './structures/TimeoutBody';
import type { BanBody } from './structures/BanBody';
import type { AnnouncementBody } from './structures/AnnouncementBody';
import type { ChatSettingsBody } from './structures/ChatSettingsBody';
import type { AutoModSettingsBody } from './structures/AutoModSettingsBody';
import { TwitchHelixError } from './structures/TwitchHelixError';
import type { GetResponses } from './types/GetResponses';
import type { PostResponses } from './types/PostResponses';
import type { PatchResponses } from './types/PatchResponses';
import type { PutResponses } from './types/PutResponses';
import type { Error } from './interfaces/Error';
import type { SubscriptionOptions } from './interfaces/SubscriptionOptions';
import type { RequestOptions } from './interfaces/RequestOptions';




export class RequestManager {

  public client: BaseClient;
  public baseURL: string;

  public constructor(client: BaseClient) {

    this.client = client;
    this.baseURL = client.proxy ?? 'https://api.twitch.tv/helix';
  }


  public async get(endpoint: string, params: string, userToken?: string, requestOptions?: RequestOptions) : GetResponses {
    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'GET', headers: this.makeHeaders(requestOptions, userToken) });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    
    return await res.json();
  }

  public async deleteWithUserToken(endpoint: string, params: string, userToken?: string, requestOptions?: RequestOptions) {
    if (userToken) {
      const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders(requestOptions, userToken) });

      if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
    } else {
      const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders(requestOptions) });

      if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
    }

  }

  public async postWithUserToken(endpoint: string, params: string, body: WhisperBody | BanBody | TimeoutBody | AnnouncementBody | SubscriptionOptions | null, userToken?: string, requestOptions?: RequestOptions): PostResponses {
    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'POST', headers: this.makeHeaders(requestOptions, userToken), body: JSON.stringify(body) });
        
    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;
    return await res.json();
  }

  public async patchWithUserToken(endpoint: string, params: string, body: ChatSettingsBody, userToken?: string, requestOptions?: RequestOptions): PatchResponses {
    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PATCH', headers: this.makeHeaders(requestOptions, userToken), body: JSON.stringify(body)});


    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    return await res.json();
  }

  public async putWithUserToken(endpoint: string, params: string, body?: AutoModSettingsBody, userToken?: string, requestOptions?: RequestOptions) : PutResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PUT', headers: this.makeHeaders(requestOptions , userToken), body: JSON.stringify(body)});

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;

    return await res.json();
  }

  public async validateUserToken(){

    const res = await fetch('https://id.twitch.tv/oauth2/validate', { headers: this.makeHeaders()});

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
  }

  private makeHeaders(requestOptions?: RequestOptions, userToken?: string) {

    const token = requestOptions?.useTokenType ? requestOptions?.useTokenType === 'user' ? userToken || this.client.userToken || this.client.appToken : this.client.appToken : userToken || this.client.userToken || this.client.appToken;

    return { 'Authorization': `Bearer ${token}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };
    
  }
}