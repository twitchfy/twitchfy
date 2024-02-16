import type { TokenAdapter  } from '../structures';

export interface HelixClientOptions{
    clientId: string
    clientSecret: string
    appToken?: TokenAdapter<'app'>
    userToken?: TokenAdapter<'code' | 'implicit'>
    preferedToken?: 'app' | 'user'
    proxy?: string

}