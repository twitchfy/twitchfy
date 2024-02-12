import type { TokenAdapter  } from '../structures';

export interface HelixClientOptions{
    clientId: string
    clientSecret: string
    appToken?: string
    userToken?: TokenAdapter
    preferedToken?: 'app' | 'user'
    proxy?: string

}