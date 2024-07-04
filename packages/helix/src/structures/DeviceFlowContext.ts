import type { StartDCFResponse, TokenDeviceFlowResponse } from '@twitchfy/api-types';
import type { TokenAdapter } from './TokenAdapter';
import type { HelixClient } from '../HelixClient';

export class DeviceFlowContext {

  public readonly client: typeof HelixClient;
  public readonly clientId: string;
  public readonly scopes: string[];
  public readonly interval: number;
  public readonly deviceCode: string;
  public readonly userCode: string;
  public readonly verificationURI: string;

  public constructor(client: typeof HelixClient, data: StartDCFResponse & { clientId: string, scopes: string[] }){
    this.client = client;
    this.clientId = data.clientId;
    this.scopes = data.scopes;
    this.interval = data.interval;
    this.deviceCode = data.device_code;
    this.userCode = data.user_code;
    this.verificationURI = data.verification_uri;
  }

  public async getToken<T extends boolean = true, K extends boolean = false>(refresh?: T, raw?: K): Promise<(K extends false ? TokenAdapter<'device', T> : TokenDeviceFlowResponse) | void>{

    const data = this.client.generateUserToken({ flow: 'device', clientId: this.clientId, scopes: this.scopes, deviceCode: this.deviceCode, raw, refresh }).catch((err) => {
      if(err.message === 'authorization_pending') return;
      throw err;
    });
    if(data) return data as Promise<(K extends false ? TokenAdapter<'device', T> : TokenDeviceFlowResponse) | void>;
  }

  public async waitForToken<T extends boolean = true, K extends boolean = false>(refresh?: T, raw?: K): Promise<(K extends false ? TokenAdapter<'device', T> : TokenDeviceFlowResponse) | void>{
    return new Promise((resolve, _reject) => {
      const interval = setInterval(async () => {
        const data = await this.getToken(refresh, raw);
        if(data){
          clearInterval(interval);
          resolve(data);
        }
      }, this.interval * 1000);
    });
  }


}