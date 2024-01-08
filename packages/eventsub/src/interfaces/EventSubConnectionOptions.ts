import { HelixOptions } from './HelixOptions';

export interface EventSubConnectionOptions { 
    clientID: string
    auth: string
    proxy?: string
    helix?: HelixOptions
}