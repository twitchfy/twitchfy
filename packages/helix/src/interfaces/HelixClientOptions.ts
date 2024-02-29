import type { TokenAdapter  } from '../structures';

export interface HelixClientOptions{
    clientID: string
    clientSecret: string
    appToken?: TokenAdapter<'app'>
    userToken?: TokenAdapter<'code' | 'implicit'>
    preferedToken?: 'app' | 'user'
    proxy?: string

}