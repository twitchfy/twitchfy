import type { GenerateTokenOptions } from './GenerateTokenOptions';

export interface GenerateAppTokenOptions<T extends boolean = boolean, K extends boolean = boolean> extends GenerateTokenOptions<T, K>  {
    clientID?: string
    clientSecret?: string
}