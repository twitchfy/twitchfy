import type { TokenAdapter } from '@twitchapi/helix';
import type { HelixOptions } from '../../interfaces';

export interface EventSubConnectionOptions { 
    clientID: string
    clientSecret: string
    userToken: TokenAdapter
    proxy?: string
    helix?: HelixOptions
}