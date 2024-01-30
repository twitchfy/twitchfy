import type { HelixOptions } from '../../interfaces';

export interface EventSubConnectionOptions { 
    clientID: string
    auth: string
    proxy?: string
    helix?: HelixOptions
}