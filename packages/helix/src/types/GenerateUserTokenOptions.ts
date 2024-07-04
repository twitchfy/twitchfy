import type { GenerateAppTokenOptions } from '../interfaces';

export type GenerateUserTokenOptions<T extends boolean = boolean, K extends boolean = boolean> = (CodeFlowOptions<T, K> | DeviceFlowOptions<T, K>)

export type CodeFlowOptions<T extends boolean = boolean, K extends boolean = boolean> = {
    flow: 'code'
    code: string
    redirectURI: string
} & GenerateAppTokenOptions<T, K>

export type DeviceFlowOptions<T extends boolean = boolean, K extends boolean = boolean> = {
    flow: 'device'
    deviceCode: string
    scopes: string[]
} & Omit<GenerateAppTokenOptions<T, K>, 'clientSecret'>