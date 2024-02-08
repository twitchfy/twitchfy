import fetch from 'node-fetch';
import type { BaseClient } from './BaseClient';
import type { WhisperBody, TimeoutBody, AnnouncementBody, BanBody, ChatSettingsBody, AutoModSettingsBody } from './structures';
import { TwitchHelixError } from './structures/TwitchHelixError';
import type { GetResponses, PostResponses, PatchResponses, PutResponses, RequestOptions} from './types';
import type { Error, SubscriptionOptions } from './interfaces';




export class RequestManager {

  public client: BaseClient;
  public baseURL: string;

  public constructor(client: BaseClient) {

    this.client = client;
    this.baseURL = client.proxy ?? 'https://api.twitch.tv/helix';
  }


  public async get(endpoint: string, params: string, requestOptions?: RequestOptions) : GetResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'GET', headers: this.makeHeaders(requestOptions) });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    
    return await res.json();
  }

  public async delete(endpoint: string, params: string, requestOptions?: RequestOptions) {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders(requestOptions) });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
  
  }

  public async post(endpoint: string, params: string, body: WhisperBody | BanBody | TimeoutBody | AnnouncementBody | SubscriptionOptions | null, requestOptions?: RequestOptions): PostResponses {
    
    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'POST', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body) });
        
    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;
    return await res.json();
  }

  public async patch(endpoint: string, params: string, body: ChatSettingsBody, requestOptions?: RequestOptions): PatchResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PATCH', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body)});


    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    return await res.json();
  }

  public async put(endpoint: string, params: string, body?: AutoModSettingsBody, requestOptions?: RequestOptions) : PutResponses {

    const res = await fetch(this.baseURL + endpoint + `?${params}`, { method: 'PUT', headers: this.makeHeaders(requestOptions), body: JSON.stringify(body)});

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;

    return await res.json();
  }

  public async validateToken(requestOptions?: RequestOptions, noError: boolean = true){

    const res = await fetch('https://id.twitch.tv/oauth2/validate', { headers: this.makeHeaders(requestOptions) } );

    if(!res.ok){

      switch(noError){

      case true : return false;

        break;

      case false : throw new TwitchHelixError(res, await res.json() as Error);

      }

    }

    return true;
  }

  private makeHeaders(requestOptions: RequestOptions) {

    let token : string;
    
    switch(requestOptions!.useTokenType){
      
    case 'app' : token = this.client.appToken;

      break;

    case 'user': {

      setRequestOptionsType<'user'>(requestOptions);

      token = requestOptions.userToken?.token || this.client.userToken?.token;

    }

      break;

    default: token = this.client.appToken;

      break;

    }

    return { 'Authorization': `Bearer ${token}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };
    
  }
}

function setRequestOptionsType<T extends 'app' | 'user'>(requestOptions: RequestOptions): asserts requestOptions is RequestOptions<T> {}