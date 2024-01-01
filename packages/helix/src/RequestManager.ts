import fetch from 'node-fetch';
import { BaseClient } from './BaseClient';
import { WhisperBody } from './structures/WhisperBody';
import { TimeoutBody } from './structures/TimeoutBody';
import { BanBody } from './structures/BanBody';
import { AnnouncementBody } from './structures/AnnouncementBody';
import { ChatSettingsBody } from './structures/ChatSettingsBody';
import { AutoModSettingsBody } from './structures/AutoModSettingsBody';
import { TwitchHelixError } from './structures/TwitchHelixError';
import type { GetResponses } from './types/GetResponses';
import type { PostResponses } from './types/PostResponses';
import type { PatchResponses } from './types/PatchResponses';
import type { PutResponses } from './types/PutResponses';
import type { Error } from './interfaces/Error';
const baseURL = 'https://api.twitch.tv/helix';





export class RequestManager {

  public client: BaseClient;

  public constructor(client: BaseClient) {
    this.client = client;
  }


  public async get(endpoint: string, params: string, userToken?: string) : GetResponses {
    const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'GET', headers: this.makeHeaders(userToken || this.client.userToken ? 'user' : 'app', userToken) });

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    
    return await res.json();
  }

  public async deleteWithUserToken(endpoint: string, params: string, userToken?: string) {
    if (userToken) {
      const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders('user', userToken) });

      if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
    } else {
      const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'DELETE', headers: this.makeHeaders('user') });

      if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
    }

  }

  public async postWithUserToken(endpoint: string, params: string, body: WhisperBody | BanBody | TimeoutBody | AnnouncementBody | null , userToken?: string): PostResponses {
    const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'POST', headers: this.makeHeaders('user', userToken), body: JSON.stringify(body) });
        
    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;
    return await res.json();
  }

  public async patchWithUserToken(endpoint: string, params: string, body: ChatSettingsBody, userToken?: string): PatchResponses {
    const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'PATCH', headers: this.makeHeaders('user', userToken), body: JSON.stringify(body)});


    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    return await res.json();
  }

  public async putWithUserToken(endpoint: string, params: string, body?: AutoModSettingsBody, userToken?: string) : PutResponses {

    const res = await fetch(baseURL + endpoint + `?${params}`, { method: 'PUT', headers: this.makeHeaders('user', userToken), body: JSON.stringify(body)});

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);

    if(res.status === 204) return;

    return await res.json();
  }

  public async validateUserToken(){
    const res = await fetch('https://id.twitch.tv/oauth2/validate', { headers: this.makeHeaders('user')});

    if(!res.ok) throw new TwitchHelixError(res, await res.json() as Error);
  }

  private makeHeaders(token: 'app' | 'user', userToken?: string) {
    if (token === 'app') {
      return { 'Authorization': `Bearer ${this.client.appToken}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };
    } else {
      return { 'Authorization': `Bearer ${userToken ?? this.client.userToken}`, 'Client-Id': this.client.clientId, 'Content-Type': 'application/json' };
    }
  }
}