import type { HelixClientCallbacks } from './HelixClientCallbacks';
import type { TokenAdapter } from '../structures';
import type { UserTokenAdapter } from '../types';

export interface HelixClientOptions{
    clientId: string
    clientSecret: string
    appToken?: TokenAdapter<'app', boolean>
    userToken?: UserTokenAdapter<boolean>
    preferedToken?: 'app' | 'user'
    proxy?: string
    callbacks?: HelixClientCallbacks

}