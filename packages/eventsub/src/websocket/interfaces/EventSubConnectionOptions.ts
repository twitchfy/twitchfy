import { HelixOptions } from '../../interfaces/HelixOptions';

export interface EventSubConnectionOptions { 
    clientID: string
    auth: string
    proxy?: string
    helix?: HelixOptions
}